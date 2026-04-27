// MeuCorre/hooks/cadastro/useRestaurarBackup.ts
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import {
  BACKUP_TABLES,
  BackupTable,
  sanitizeBackupRow,
  validateBackupPayload,
} from '../../constants/backupSchema';

const mostrarAviso = (titulo: string, mensagem: string) => {
  Alert.alert(titulo, mensagem);
  showCustomAlert(titulo, mensagem);
};

export function useRestaurarBackup() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const executarRestauracao = async (data: any) => {
    let transacaoAberta = false;
    setCarregando(true);

    try {
      const tabelasData = validateBackupPayload(data);
      await db.execAsync('PRAGMA foreign_keys = OFF;');
      await db.execAsync('BEGIN TRANSACTION;');
      transacaoAberta = true;

      for (const tabela of [...BACKUP_TABLES].reverse()) {
        await db.execAsync(`DELETE FROM ${tabela};`);
      }

      for (const tabela of BACKUP_TABLES) {
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

      Alert.alert(
        'Backup restaurado',
        'Dados restaurados. Bem-vindo de volta!',
        [
          {
            text: 'Ir para Dashboard',
            onPress: () => router.replace('/(tabs)/dashboard'),
          },
        ],
      );
    } catch (error: any) {
      if (transacaoAberta) {
        try {
          await db.execAsync('ROLLBACK;');
        } catch (rollbackError) {
          console.warn(
            '[RESTORE] ROLLBACK não concluído:',
            rollbackError,
          );
        }
      }

      try {
        await db.execAsync('PRAGMA foreign_keys = ON;');
      } catch {}

      console.error('[RESTORE][FATAL]', error);
      mostrarAviso(
        'Erro na restauração',
        'O arquivo de backup é inválido ou incompatível com o KORRE.',
      );
    } finally {
      setCarregando(false);
    }
  };

  const selecionarArquivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      if (!result.assets?.[0]?.uri) {
        mostrarAviso(
          'Backup não selecionado',
          'Não foi possível acessar o arquivo escolhido.',
        );
        return;
      }

      const asset = result.assets[0];
      const conteudo = await FileSystem.readAsStringAsync(
        asset.uri,
      );

      if (!conteudo) {
        mostrarAviso(
          'Arquivo vazio',
          'O arquivo selecionado está vazio.',
        );
        return;
      }

      let dados: unknown;
      try {
        dados = JSON.parse(conteudo);
      } catch (error) {
        console.error('[PICKER] JSON inválido:', error);
        mostrarAviso(
          'Arquivo inválido',
          'O arquivo selecionado não é um JSON válido. Escolha um backup exportado pelo KORRE.',
        );
        return;
      }

      Alert.alert(
        'Restaurar dados',
        `Deseja importar o backup "${asset.name}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sim, restaurar',
            onPress: () => {
              void executarRestauracao(dados);
            },
          },
        ],
      );
    } catch (e: any) {
      console.error('[PICKER][ERRO CRÍTICO]', e);
      mostrarAviso(
        'Erro de leitura',
        'Não foi possível processar este arquivo. Verifique se é um JSON válido.',
      );
    }
  };

  return { selecionarArquivo, carregando };
}
