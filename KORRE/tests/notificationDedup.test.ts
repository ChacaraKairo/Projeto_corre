import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { shouldCreateNotificationForDedup } from '../notifications/notificationDedup';

describe('notification dedup', () => {
  it('nao dispara notificacao duplicada com mesma dedupKey', () => {
    assert.equal(
      shouldCreateNotificationForDedup('meta_batida:2026-04-26', true),
      false,
    );
  });

  it('permite notificacao sem dedupKey', () => {
    assert.equal(
      shouldCreateNotificationForDedup(undefined, true),
      true,
    );
  });
});
