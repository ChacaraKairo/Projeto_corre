import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  containsSqlLikeInput,
  parseRemoteCommandPayload,
} from '../notifications/RemoteCommandValidation';

describe('remote command validation', () => {
  it('rejeita comando remoto desconhecido', () => {
    assert.throws(() =>
      parseRemoteCommandPayload({
        kind: 'command',
        command: 'DROP_DATABASE',
        requestId: 'abc-123',
      }),
    );
  });

  it('rejeita payload sem requestId', () => {
    assert.throws(() =>
      parseRemoteCommandPayload({
        kind: 'command',
        command: 'GET_APP_STATUS',
      }),
    );
  });

  it('aceita CREATE_NOTIFICATION valido', () => {
    const payload = parseRemoteCommandPayload({
      kind: 'command',
      command: 'CREATE_NOTIFICATION',
      requestId: 'abc-123',
      payload: {
        titulo: 'Aviso',
        mensagem: 'Mensagem segura',
      },
    });

    assert.equal(payload.command, 'CREATE_NOTIFICATION');
    assert.equal(payload.requestId, 'abc-123');
  });

  it('nao aceita SQL cru no payload', () => {
    assert.equal(
      containsSqlLikeInput({ query: 'DROP TABLE notificacoes' }),
      true,
    );
    assert.throws(() =>
      parseRemoteCommandPayload({
        kind: 'command',
        command: 'CREATE_NOTIFICATION',
        requestId: 'abc-123',
        payload: { mensagem: 'SELECT * FROM perfil_usuario' },
      }),
    );
  });
});
