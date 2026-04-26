// MeuCorre/hooks/cadastro/useRestaurarBackup.ts
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert'; // Verifique se o caminho está correto
import {
  BACKUP_TABLES,
  BackupTable,
  sanitizeBackupRow,
} from '../../constants/backupSchema';

export function useRestaurarBackup() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const executarRestauracao = async (data: any) => {
    setCarregando(true);

    const tabelas_data = data.tabelas ? data.tabelas : data;

    try {
      await db.execAsync('PRAGMA foreign_keys = OFF;');
      await db.execAsync('BEGIN TRANSACTION;');

      for (const tabela of BACKUP_TABLES) {
        await db.execAsync(`DELETE FROM ${tabela};`);
        const rows = tabelas_data[tabela];

        if (
          rows &&
          Array.isArray(rows) &&
          rows.length > 0
        ) {
          for (const row of rows) {
            const { columns: colunas, values } =
              sanitizeBackupRow(
                tabela as BackupTable,
                row as Record<string, unknown>,
              );

            if (colunas.length === 0) continue;

            const placeholders = colunas
              .map(() => '?')
              .join(', ');
            const colunasStr = colunas.join(', ');

            await db.runAsync(
              `INSERT OR REPLACE INTO ${tabela} (${colunasStr}) VALUES (${placeholders})`,
              values,
            );
          }
        }
      }

      await db.execAsync('COMMIT;');
      await db.execAsync('PRAGMA foreign_keys = ON;');

      // CORREÇÃO AQUI: Passando o array de botões conforme sua Interface AlertButton
      setTimeout(() => {
        showCustomAlert(
          'Sucesso!',
          'Dados restaurados. Bem-vindo de volta!',
          [
            {
              text: 'Ir para Dashboard',
              onPress: () =>
                router.replace('/(tabs)/dashboard'),
            },
          ],
        );
      }, 200);
    } catch (error: any) {
      await db.execAsync('ROLLBACK;');
      await db.execAsync('PRAGMA foreign_keys = ON;');
      console.error('[RESTORE][FATAL]', error);

      setTimeout(() => {
        showCustomAlert(
          'Erro na Restauração',
          'O arquivo de backup é inválido ou incompatível.',
        );
      }, 200);
    } finally {
      setCarregando(false);
    }
  };

  const selecionarArquivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true, // OBRIGATÓRIO para garantir acesso ao arquivo
      });

      if (result.canceled || !result.assets) {
        return;
      }

      const asset = result.assets[0];

      // Tenta ler o conteúdo
      const conteudo = await FileSystem.readAsStringAsync(
        asset.uri,
      );

      if (!conteudo) {
        return;
      }

      // Tenta converter para JSON
      const dados = JSON.parse(conteudo);

      // Dispara o Alerta (com um pequeno delay para não conflitar com o fechar do picker)
      setTimeout(() => {
        showCustomAlert(
          'Restaurar Dados',
          `Deseja importar o backup "${asset.name}"?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Sim, Restaurar',
              onPress: () => {
                executarRestauracao(dados);
              },
            },
          ],
        );
      }, 400);
    } catch (e: any) {
      console.error('[PICKER][ERRO CRÍTICO]', e);
      showCustomAlert(
        'Erro de Leitura',
        'Não foi possível processar este arquivo. Verifique se é um JSON válido.',
      );
    }
  };

  return { selecionarArquivo, carregando };
}
