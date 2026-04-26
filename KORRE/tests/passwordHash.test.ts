import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  formatPasswordHash,
  parsePasswordHash,
  timingSafeEqual,
} from '../utils/auth/passwordHashFormat';

describe('password hash format', () => {
  it('serializa e interpreta hash moderno com salt', () => {
    const stored = formatPasswordHash(25000, 'salt-local', 'abc123');
    const parsed = parsePasswordHash(stored);

    assert.deepEqual(parsed, {
      iterations: 25000,
      salt: 'salt-local',
      hash: 'abc123',
    });
  });

  it('rejeita formatos antigos no parser moderno', () => {
    assert.equal(parsePasswordHash('abc123'), null);
  });

  it('compara hashes sem curto-circuito por conteudo', () => {
    assert.equal(timingSafeEqual('abc', 'abc'), true);
    assert.equal(timingSafeEqual('abc', 'abd'), false);
    assert.equal(timingSafeEqual('abc', 'abcd'), false);
  });
});
