import db from '../database/DatabaseInit';
import { AppRoutes } from '../constants/routes';
import { criarNotificacao } from './NotificationService';

const KM_ALERTA_MANUTENCAO = 500;
const DIAS_SEM_LANCAMENTO = 3;
const DIAS_BACKUP_ALERTA = 7;
const HORARIO_ALERTA_META = 20;
const DIA_VENCIMENTO_DAS = 20;

export async function executarVerificacoesLocais() {
  await verificarAlertasManutencao();
  await verificarBackupPendente();
  await verificarLancamentosRecentes();
  await verificarIndicesFinanceirosDesatualizados();
  await verificarDasMeiPendente();
}

export async function verificarAlertasManutencao() {
  const veiculo = await db.getFirstAsync<{
    id: number;
    km_atual: number;
  }>('SELECT id, km_atual FROM veiculos WHERE ativo = 1 LIMIT 1');

  if (!veiculo) return;

  const itens = await db.getAllAsync<{
    id: number;
    nome: string;
    ultima_troca_km: number;
    intervalo_km: number | null;
  }>(
    `SELECT id, nome, ultima_troca_km, intervalo_km
     FROM itens_manutencao
     WHERE veiculo_id = ? AND intervalo_km IS NOT NULL`,
    [veiculo.id],
  );

  for (const item of itens) {
    const intervaloKm = Number(item.intervalo_km || 0);
    if (intervaloKm <= 0) continue;

    const kmLimite =
      Number(item.ultima_troca_km || 0) + intervaloKm;
    const kmRestante = kmLimite - Number(veiculo.km_atual || 0);

    if (kmRestante <= 0) {
      await criarNotificacao({
        titulo: `${item.nome} venceu`,
        mensagem: `A manutencao passou do limite em ${Math.abs(kmRestante)} km.`,
        tipo: 'manutencao',
        destino: AppRoutes.oficina,
        dedupKey: `manutencao_vencida:item_${item.id}:km_${kmLimite}`,
      });
    } else if (kmRestante <= KM_ALERTA_MANUTENCAO) {
      await criarNotificacao({
        titulo: `${item.nome} quase no limite`,
        mensagem: `Faltam ${kmRestante} km para a proxima manutencao.`,
        tipo: 'manutencao',
        destino: AppRoutes.oficina,
        dedupKey: `manutencao_proxima:item_${item.id}:km_${kmLimite}`,
      });
    }
  }
}

export async function verificarMetaDiaria() {
  const user = await db.getFirstAsync<{
    meta_diaria: number;
    tipo_meta: string;
  }>('SELECT meta_diaria, tipo_meta FROM perfil_usuario LIMIT 1');

  if (!user || user.tipo_meta !== 'diaria') return;
  const metaDiaria = Number(user.meta_diaria || 0);
  if (metaDiaria <= 0) return;

  const hoje = getToday();
  const ganhos = await db.getFirstAsync<{ total: number }>(
    `SELECT COALESCE(SUM(valor), 0) as total
     FROM transacoes_financeiras
     WHERE tipo = 'ganho' AND date(data_transacao) = ?`,
    [hoje],
  );

  const totalGanhos = Number(ganhos?.total || 0);
  if (totalGanhos >= metaDiaria) {
    await criarNotificacao({
      titulo: 'Meta batida',
      mensagem: 'Voce atingiu sua meta diaria. Belo fechamento!',
      tipo: 'sucesso',
      destino: AppRoutes.dashboard,
      dedupKey: `meta_batida:${hoje}`,
    });
    return;
  }

  if (new Date().getHours() >= HORARIO_ALERTA_META) {
    await criarNotificacao({
      titulo: 'Meta ainda incompleta',
      mensagem: `Faltam R$ ${(metaDiaria - totalGanhos).toFixed(2)} para bater sua meta de hoje.`,
      tipo: 'financeiro',
      destino: AppRoutes.finance,
      dedupKey: `meta_incompleta:${hoje}`,
    });
  }
}

export async function verificarLancamentosRecentes() {
  const row = await db.getFirstAsync<{ ultima: string | null }>(
    'SELECT MAX(data_transacao) as ultima FROM transacoes_financeiras',
  );

  if (!row?.ultima) return;

  const ultima = new Date(row.ultima);
  const diffDias =
    (Date.now() - ultima.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDias >= DIAS_SEM_LANCAMENTO) {
    await criarNotificacao({
      titulo: 'Tudo certo por ai?',
      mensagem:
        'Voce esta ha alguns dias sem lancar ganhos ou despesas.',
      tipo: 'financeiro',
      destino: AppRoutes.finance,
      dedupKey: `sem_lancamentos:${getToday()}`,
    });
  }
}

export async function verificarGastosAcimaDaMedia() {
  return;
}

export async function verificarIndicesFinanceirosDesatualizados() {
  const veiculo = await db.getFirstAsync<{
    id: number;
    custo_km_calculado: number | null;
    custo_minuto_calculado: number | null;
    meta_ganho_minuto_calculado: number | null;
    taxa_completude: number | null;
  }>(
    `SELECT id, custo_km_calculado, custo_minuto_calculado,
      meta_ganho_minuto_calculado, taxa_completude
     FROM veiculos
     WHERE ativo = 1
     LIMIT 1`,
  );

  if (!veiculo) return;

  const possuiIndices =
    Number(veiculo.custo_km_calculado || 0) > 0 &&
    Number(veiculo.custo_minuto_calculado || 0) > 0 &&
    Number(veiculo.meta_ganho_minuto_calculado || 0) > 0;

  const completude = Number(veiculo.taxa_completude || 0);

  if (!possuiIndices || completude < 50) {
    await criarNotificacao({
      titulo: 'Revise seus indices',
      mensagem:
        'Complete a calculadora para manter custo por km, custo por minuto e metas atualizados.',
      tipo: 'financeiro',
      destino: AppRoutes.calculadora,
      dedupKey: `indices_desatualizados:${veiculo.id}:${getToday()}`,
    });
  }
}

export async function verificarBackupPendente() {
  const row = await db.getFirstAsync<{ valor: string }>(
    'SELECT valor FROM configuracoes_app WHERE chave = ?',
    ['ultimo_backup_exportado_em'],
  );

  if (!row?.valor) {
    await criarNotificacao({
      titulo: 'Faca um backup',
      mensagem:
        'Proteja seus dados exportando um backup do KORRE.',
      tipo: 'backup',
      destino: AppRoutes.configuracoes,
      dedupKey: `backup_pendente:sem_backup:${getToday()}`,
    });
    return;
  }

  const ultimoBackup = new Date(row.valor);
  const diffDias =
    (Date.now() - ultimoBackup.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDias >= DIAS_BACKUP_ALERTA) {
    await criarNotificacao({
      titulo: 'Faca um backup',
      mensagem:
        'Ja faz alguns dias desde seu ultimo backup dos dados.',
      tipo: 'backup',
      destino: AppRoutes.configuracoes,
      dedupKey: `backup_pendente:${getToday()}`,
    });
  }
}

export async function verificarDasMeiPendente() {
  const hoje = new Date();
  const diaAtual = hoje.getDate();

  if (diaAtual < DIA_VENCIMENTO_DAS - 2) return;

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const chaveDas = `mei_das_pago_${ano}-${mes}`;

  const row = await db.getFirstAsync<{ valor: string }>(
    'SELECT valor FROM configuracoes_app WHERE chave = ?',
    [chaveDas],
  );

  if (row?.valor === 'true') return;

  const vencido = diaAtual > DIA_VENCIMENTO_DAS;
  await criarNotificacao({
    titulo: vencido ? 'DAS do MEI pendente' : 'Lembrete do DAS',
    mensagem: vencido
      ? 'O vencimento do DAS deste mes ja passou. Marque como pago no painel MEI quando regularizar.'
      : `O DAS vence no dia ${DIA_VENCIMENTO_DAS}. Confira e marque como pago no painel MEI.`,
    tipo: 'financeiro',
    destino: AppRoutes.relatorios,
    dedupKey: `das_mei:${ano}-${mes}:${vencido ? 'vencido' : 'aviso'}`,
  });
}

const getToday = () => new Date().toISOString().split('T')[0];
