import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  BACKUP_APP_NAME,
  BACKUP_SCHEMA_VERSION,
  BACKUP_TABLES,
  validateBackupPayload,
} from '../constants/backupSchema';

const makeBackup = (
  app = BACKUP_APP_NAME,
  versaoBanco = BACKUP_SCHEMA_VERSION,
) => ({
  app,
  versao_banco: versaoBanco,
  tabelas: Object.fromEntries(
    BACKUP_TABLES.map((table) => [table, []]),
  ),
});

describe('backup schema validation', () => {
  it('aceita backup KORRE v2', () => {
    const tabelas = validateBackupPayload(
      makeBackup(BACKUP_APP_NAME, 2),
    );
    assert.deepEqual(tabelas.perfil_usuario, []);
  });

  it('aceita backup KORRE v3', () => {
    const tabelas = validateBackupPayload(
      makeBackup(BACKUP_APP_NAME, 3),
    );
    assert.deepEqual(tabelas.perfil_usuario, []);
  });

  it('aceita backup KORRE v4', () => {
    const tabelas = validateBackupPayload(makeBackup());
    assert.deepEqual(tabelas.perfil_usuario, []);
  });

  it('rejeita backup de outro app', () => {
    assert.throws(() => validateBackupPayload(makeBackup('OutroApp')));
  });
});
