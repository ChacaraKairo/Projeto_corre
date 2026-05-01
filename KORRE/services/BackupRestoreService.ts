import db from '../database/DatabaseInit';
import {
  BACKUP_TABLES,
  BackupTable,
  sanitizeBackupRow,
  validateBackupPayload,
} from '../constants/backupSchema';
import { logger } from '../utils/logger';

interface RestoreBackupOptions {
  onProgress?: (message: string) => Promise<void> | void;
}

export const BackupRestoreService = {
  async restaurarBackup(
    data: unknown,
    options: RestoreBackupOptions = {},
  ) {
    let transacaoAberta = false;

    try {
      const tabelasData = validateBackupPayload(data);
      await db.execAsync('PRAGMA foreign_keys = OFF;');
      await db.execAsync('BEGIN TRANSACTION;');
      transacaoAberta = true;

      for (const tabela of [...BACKUP_TABLES].reverse()) {
        await options.onProgress?.(`Limpando ${tabela}...`);
        await db.execAsync(`DELETE FROM ${tabela};`);
      }

      for (const tabela of BACKUP_TABLES) {
        await options.onProgress?.(`Restaurando ${tabela}...`);
        const rows = tabelasData[tabela];
        if (!Array.isArray(rows) || rows.length === 0) {
          continue;
        }

        for (const row of rows) {
          const { columns, values } = sanitizeBackupRow(
            tabela as BackupTable,
            row as Record<string, unknown>,
          );

          if (columns.length === 0) continue;

          const placeholders = columns.map(() => '?').join(', ');
          await db.runAsync(
            `INSERT OR REPLACE INTO ${tabela} (${columns.join(', ')}) VALUES (${placeholders})`,
            values,
          );
        }
      }

      await db.execAsync('COMMIT;');
      transacaoAberta = false;
    } catch (error) {
      if (transacaoAberta) {
        try {
          await db.execAsync('ROLLBACK;');
        } catch (rollbackError) {
          logger.warn(
            '[BackupRestore] ROLLBACK não concluído:',
            rollbackError,
          );
        }
      }

      logger.error('[BackupRestore] Falha ao restaurar:', error);
      throw error;
    } finally {
      try {
        await db.execAsync('PRAGMA foreign_keys = ON;');
      } catch (pragmaError) {
        logger.warn(
          '[BackupRestore] Falha ao reativar foreign_keys:',
          pragmaError,
        );
      }
    }
  },
};
