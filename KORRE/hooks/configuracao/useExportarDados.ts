// src/hooks/configuracoes/useExportarDados.ts
import { useState } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import {
  BACKUP_APP_NAME,
  BACKUP_EXPORT_COLUMNS,
  BACKUP_SCHEMA_VERSION,
  BACKUP_TABLES,
} from '../../constants/backupSchema';
import {
  hideAppLoading,
  showAppLoadingAsync,
} from '../ui/useAppLoading';

const BACKUP_MIME = 'application/json';

export function useExportarDados() {
  const [isExportando, setIsExportando] = useState(false);

  const montarBackup = async () => {
    const backupData: any = {
      app: BACKUP_APP_NAME,
      data_exportacao: new Date().toISOString(),
      versao_banco: BACKUP_SCHEMA_VERSION,
      tabelas: {},
    };

    for (const tabela of BACKUP_TABLES) {
      const tableInfo = await db.getAllAsync<{ name: string }>(
        `PRAGMA table_info(${tabela});`,
      );
      const colunasExistentes = new Set(
        tableInfo.map((column) => column.name),
      );
      const colunas = BACKUP_EXPORT_COLUMNS[tabela].filter(
        (column) => colunasExistentes.has(column),
      );

      if (colunas.length === 0) {
        backupData.tabelas[tabela] = [];
        continue;
      }

      backupData.tabelas[tabela] = await db.getAllAsync(
        `SELECT ${colunas.join(', ')} FROM ${tabela}`,
      );
    }

    return backupData;
  };

  const registrarBackupExportado = async () => {
    await db.runAsync(
      'INSERT OR REPLACE INTO configuracoes_app (chave, valor) VALUES (?, ?)',
      ['ultimo_backup_exportado_em', new Date().toISOString()],
    );
  };

  const exportarDados = async () => {
    if (isExportando) return;
    setIsExportando(true);
    await showAppLoadingAsync('Gerando backup...');

    try {
      const backupData = await montarBackup();
      const json = JSON.stringify(backupData);
      const nomeArquivo = `KORRE_Backup_v${BACKUP_SCHEMA_VERSION}.json`;
      const fileUri = FileSystem.documentDirectory + nomeArquivo;

      await FileSystem.writeAsStringAsync(fileUri, json);

      if (
        Platform.OS === 'android' &&
        FileSystem.StorageAccessFramework
      ) {
        hideAppLoading();
        const permission =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permission.granted) {
          await showAppLoadingAsync('Salvando backup...');
          const destinationUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permission.directoryUri,
              nomeArquivo,
              BACKUP_MIME,
            );
          await FileSystem.StorageAccessFramework.writeAsStringAsync(
            destinationUri,
            json,
          );
          await registrarBackupExportado();
          hideAppLoading();
          showCustomAlert(
            'Backup salvo',
            'O arquivo JSON foi salvo na pasta escolhida.',
          );
          return;
        }
      }

      if (await Sharing.isAvailableAsync()) {
        await showAppLoadingAsync('Abrindo compartilhamento...');
        await Sharing.shareAsync(fileUri, {
          mimeType: BACKUP_MIME,
          dialogTitle: 'Exportar Backup do KORRE',
          UTI: 'public.json',
        });
        await registrarBackupExportado();
        hideAppLoading();
        showCustomAlert(
          'Backup pronto',
          'O arquivo JSON foi gerado. Use a opção de salvar/arquivos do sistema para guardar uma cópia.',
        );
      } else {
        hideAppLoading();
        showCustomAlert(
          'Backup gerado',
          'O arquivo foi salvo no armazenamento do aplicativo, mas o compartilhamento não está disponível neste dispositivo.',
        );
      }
    } catch (error) {
      hideAppLoading();
      console.error('[Backup] Falha ao exportar:', error);
      showCustomAlert(
        'Erro no backup',
        'Não foi possível gerar ou salvar o arquivo de backup.',
      );
    } finally {
      setIsExportando(false);
    }
  };

  return { exportarDados, isExportando };
}
