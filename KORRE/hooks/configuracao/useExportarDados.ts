// src/hooks/configuracoes/useExportarDados.ts
import { useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import {
  BACKUP_EXPORT_COLUMNS,
  BACKUP_TABLES,
} from '../../constants/backupSchema';

export function useExportarDados() {
  const [isExportando, setIsExportando] = useState(false);

  const exportarDados = async () => {
    setIsExportando(true);
    try {
      const backupData: any = {
        app: 'KORRE',
        data_exportacao: new Date().toISOString(),
        versao_banco: 1,
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
        'KORRE_Backup_v1.json';
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(backupData, null, 2),
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
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
