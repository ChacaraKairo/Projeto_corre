// src/hooks/configuracoes/useGerenciarDados.ts
import { Alert } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import {
  BACKUP_TABLES,
  BackupTable,
  sanitizeBackupRow,
  validateBackupPayload,
} from '../../constants/backupSchema';
import {
  hideAppLoading,
  showAppLoadingAsync,
} from '../ui/useAppLoading';

const mostrarErroBackup = (titulo: string, mensagem: string) => {
  Alert.alert(titulo, mensagem);
  showCustomAlert(titulo, mensagem);
};

export function useGerenciarDados() {
  const router = useRouter();
  const [importandoBackup, setImportandoBackup] =
    useState(false);

  const executarRestauracao = async (data: any) => {
    let transacaoAberta = false;
    setImportandoBackup(true);
    await showAppLoadingAsync('Restaurando backup...');

    try {
      const tabelasData = validateBackupPayload(data);
      await db.execAsync('PRAGMA foreign_keys = OFF;');
      await db.execAsync('BEGIN TRANSACTION;');
      transacaoAberta = true;

      for (const tabela of [...BACKUP_TABLES].reverse()) {
        await showAppLoadingAsync(`Limpando ${tabela}...`);
        await db.execAsync(`DELETE FROM ${tabela};`);
      }

      for (const tabela of BACKUP_TABLES) {
        await showAppLoadingAsync(`Restaurando ${tabela}...`);
        const rows = tabelasData[tabela];
        if (!Array.isArray(rows) || rows.length === 0) {
          continue;
        }

        for (const row of rows) {
          const { columns: colunas, values } =
            sanitizeBackupRow(
              tabela as BackupTable,
              row as Record<string, unknown>,
            );

          if (colunas.length === 0) continue;

          const placeholders = colunas.map(() => '?').join(', ');
          await db.runAsync(
            `INSERT OR REPLACE INTO ${tabela} (${colunas.join(', ')}) VALUES (${placeholders})`,
            values,
          );
        }
      }

      await db.execAsync('COMMIT;');
      transacaoAberta = false;
      await db.execAsync('PRAGMA foreign_keys = ON;');

      hideAppLoading();
      Alert.alert(
        'Backup restaurado',
        'Backup restaurado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/dashboard'),
          },
        ],
      );
    } catch (error) {
      if (transacaoAberta) {
        try {
          await db.execAsync('ROLLBACK;');
        } catch (rollbackError) {
          console.warn(
            '[Backup] ROLLBACK não concluído:',
            rollbackError,
          );
        }
      }

      try {
        await db.execAsync('PRAGMA foreign_keys = ON;');
      } catch (pragmaError) {
        console.warn(
          '[Backup] Falha ao reativar foreign_keys:',
          pragmaError,
        );
      }

      console.error('[Backup] Falha ao restaurar:', error);
      hideAppLoading();
      mostrarErroBackup(
        'Falha ao restaurar backup',
        'O arquivo selecionado não pôde ser restaurado. Verifique se ele é um backup JSON válido do KORRE.',
      );
    } finally {
      hideAppLoading();
      setImportandoBackup(false);
    }
  };

  const importarBackup = async () => {
    if (importandoBackup) return;

    try {
      await showAppLoadingAsync('Selecionando backup...');
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });
      hideAppLoading();

      if (res.canceled) return;

      if (!res.assets?.[0]?.uri) {
        mostrarErroBackup(
          'Backup não selecionado',
          'Não foi possível acessar o arquivo escolhido.',
        );
        return;
      }

      await showAppLoadingAsync('Lendo backup...');
      const content = await FileSystem.readAsStringAsync(
        res.assets[0].uri,
      );
      hideAppLoading();

      try {
        await executarRestauracao(JSON.parse(content));
      } catch (parseError) {
        console.error('[Backup] JSON inválido:', parseError);
        mostrarErroBackup(
          'Arquivo inválido',
          'O arquivo selecionado não é um JSON válido. Escolha um backup exportado pelo KORRE.',
        );
      }
    } catch (error) {
      hideAppLoading();
      console.error('[Backup] Falha ao ler arquivo:', error);
      mostrarErroBackup(
        'Falha ao ler backup',
        'Não foi possível abrir o arquivo selecionado. Tente escolher outro arquivo JSON.',
      );
    }
  };

  const limparTodosOsDados = () => {
    Alert.alert(
      'Limpar tudo?',
      'Isto apagará permanentemente seu perfil e histórico.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar Tudo',
          style: 'destructive',
          onPress: async () => {
            try {
              await showAppLoadingAsync('Limpando dados...');
              await db.execAsync(
                'PRAGMA foreign_keys = OFF;',
              );

              for (const tabela of [...BACKUP_TABLES].reverse()) {
                await db.execAsync(`DELETE FROM ${tabela};`);
              }

              await db.execAsync('PRAGMA foreign_keys = ON;');
              router.replace('/(auth)/cadastro');
            } catch (error) {
              try {
                await db.execAsync('PRAGMA foreign_keys = ON;');
              } catch {}

              console.error('[Backup] Falha ao limpar dados:', error);
              mostrarErroBackup(
                'Falha ao limpar dados',
                'Não foi possível apagar os dados agora. Tente novamente.',
              );
            } finally {
              hideAppLoading();
            }
          },
        },
      ],
    );
  };

  return {
    importarBackup,
    importandoBackup,
    limparTodosOsDados,
  };
}
