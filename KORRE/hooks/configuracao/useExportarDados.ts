// src/hooks/configuracoes/useExportarDados.ts
import { useState } from 'react';
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

export function useExportarDados() {
  const [isExportando, setIsExportando] = useState(false);

  const exportarDados = async () => {
    setIsExportando(true);
    try {
      const backupData: any = {
        app: BACKUP_APP_NAME,
        data_exportacao: new Date().toISOString(),
        versao_banco: BACKUP_SCHEMA_VERSION,
        tabelas: {},
      };

      for (const tabela of BACKUP_TABLES) {
        const colunas = BACKUP_EXPORT_COLUMNS[tabela].join(', ');
        const rows = await db.getAllAsync(
          `SELECT ${colunas} FROM ${tabela}`,
        );
        backupData.tabelas[tabela] = rows;
      }

      const fileUri =
        FileSystem.documentDirectory +
        `KORRE_Backup_v${BACKUP_SCHEMA_VERSION}.json`;
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(backupData, null, 2),
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        await db.runAsync(
          'INSERT OR REPLACE INTO configuracoes_app (chave, valor) VALUES (?, ?)',
          ['ultimo_backup_exportado_em', new Date().toISOString()],
        );
      }
    } catch (error) {
      showCustomAlert(
        'Erro',
        'Falha ao gerar arquivo de backup.',
      );
    } finally {
      setIsExportando(false);
    }
  };

  return { exportarDados, isExportando };
}
