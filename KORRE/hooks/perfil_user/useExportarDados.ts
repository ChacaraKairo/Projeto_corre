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
      const backupData: any = {};

      for (const tabela of BACKUP_TABLES) {
        const colunas = BACKUP_EXPORT_COLUMNS[tabela].join(', ');
        const rows = await db.getAllAsync(
          `SELECT ${colunas} FROM ${tabela}`,
        );
        backupData[tabela] = rows;
      }

      const backupCompleto = {
        app: 'KORRE',
        data_exportacao: new Date().toISOString(),
        versao_banco: 1,
        tabelas: backupData,
      };

      const jsonString = JSON.stringify(
        backupCompleto,
        null,
        2,
      );

      const fileUri =
        FileSystem.documentDirectory +
        'KORRE_Backup_v1.json';

      // 5. Salvar o arquivo JSON temporariamente
      await FileSystem.writeAsStringAsync(
        fileUri,
        jsonString,
        {
          encoding: FileSystem.EncodingType.UTF8,
        },
      );

      // 6. Abrir compartilhamento nativo
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Exportar Backup do KORRE',
          UTI: 'public.json',
        });
      } else {
        showCustomAlert(
          'Erro',
          'A partilha não está disponível neste dispositivo.',
        );
      }
    } catch (error) {
      console.error('Erro ao exportar Backup:', error);
      showCustomAlert(
        'Erro',
        'Não foi possível gerar o ficheiro de backup completo.',
      );
    } finally {
      setIsExportando(false);
    }
  };

  return { exportarDados, isExportando };
}
