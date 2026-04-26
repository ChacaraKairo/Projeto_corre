import * as Notifications from 'expo-notifications';
import db from '../database/DatabaseInit';
import type {
  CriarNotificacaoInput,
  NotificacaoHistorico,
} from './NotificationTypes';
import { shouldCreateNotificationForDedup } from './notificationDedup';

export async function solicitarPermissaoNotificacoes() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;

  const result = await Notifications.requestPermissionsAsync();
  return result.status === 'granted';
}

export async function criarNotificacao(
  input: CriarNotificacaoInput,
) {
  const podeNotificar = await solicitarPermissaoNotificacoes();
  if (!podeNotificar) return;

  if (
    !shouldCreateNotificationForDedup(
      input.dedupKey,
      input.dedupKey ? await hasDedupKey(input.dedupKey) : false,
    )
  ) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: buildNotificationContent(input),
    trigger: null,
  });

  await salvarNotificacao(input);
}

export async function criarNotificacaoAgendada(
  input: CriarNotificacaoInput,
  trigger: Notifications.NotificationTriggerInput,
) {
  const podeNotificar = await solicitarPermissaoNotificacoes();
  if (!podeNotificar) return;

  if (
    !shouldCreateNotificationForDedup(
      input.dedupKey,
      input.dedupKey ? await hasDedupKey(input.dedupKey) : false,
    )
  ) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: buildNotificationContent(input),
    trigger,
  });

  await salvarNotificacao(input);
}

export async function listarNotificacoes() {
  const rows = await db.getAllAsync<
    NotificacaoHistorico & { dados_json?: string | null }
  >('SELECT * FROM notificacoes ORDER BY id DESC');

  return rows.map((row) => ({
    ...row,
    dados: parseDadosJson(row.dados_json),
  }));
}

export async function marcarNotificacaoComoLida(id: number) {
  await db.runAsync(
    'UPDATE notificacoes SET lida = 1 WHERE id = ?',
    [id],
  );
}

export async function limparHistoricoNotificacoes() {
  await db.runAsync('DELETE FROM notificacoes');
}

export async function registrarDedupKey(dedupKey: string) {
  await db.runAsync(
    'INSERT OR IGNORE INTO notificacao_dedup (chave) VALUES (?)',
    [dedupKey],
  );
}

export async function hasDedupKey(dedupKey: string) {
  const row = await db.getFirstAsync<{ chave: string }>(
    'SELECT chave FROM notificacao_dedup WHERE chave = ? LIMIT 1',
    [dedupKey],
  );
  return Boolean(row);
}

const salvarNotificacao = async (
  input: CriarNotificacaoInput,
) => {
  if (input.dedupKey) {
    await registrarDedupKey(input.dedupKey);
  }

  await db.runAsync(
    `INSERT INTO notificacoes
      (titulo, mensagem, tipo, origem, destino, dados_json, dedup_key)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.titulo,
      input.mensagem,
      input.tipo,
      input.origem ?? 'local',
      input.destino ?? null,
      input.dados ? JSON.stringify(input.dados) : null,
      input.dedupKey ?? null,
    ],
  );
};

const buildNotificationContent = (
  input: CriarNotificacaoInput,
) => ({
  title: input.titulo,
  body: input.mensagem,
  data: {
    tipo: input.tipo,
    origem: input.origem ?? 'local',
    destino: input.destino,
    dedupKey: input.dedupKey,
    ...(input.dados ?? {}),
  },
});

const parseDadosJson = (dadosJson?: string | null) => {
  if (!dadosJson) return undefined;

  try {
    return JSON.parse(dadosJson);
  } catch {
    return undefined;
  }
};
