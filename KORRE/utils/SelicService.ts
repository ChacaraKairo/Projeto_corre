import db from '../database/DatabaseInit';
import { logger } from './logger';

const BCB_API_URL =
  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json';

type BcbSelicResponse = Array<{
  data: string;
  valor: string;
}>;

export const SelicService = {
  async validarEAtualizarSelic() {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mesAnoAtual = `${hoje.getMonth() + 1}-${hoje.getFullYear()}`;

    if (dia !== 1) return;

    try {
      const config = await db.getFirstAsync<{
        valor: string;
      }>(
        "SELECT valor FROM configuracoes_app WHERE chave = 'ultima_atualizacao_selic'",
      );

      if (config?.valor === mesAnoAtual) {
        logger.info('[Selic] Já atualizado este mês.');
        return;
      }

      const response = await fetch(BCB_API_URL);
      if (!response.ok) {
        throw new Error(`BCB respondeu ${response.status}`);
      }

      const dados = (await response.json()) as BcbSelicResponse;
      const novaTaxa = Number.parseFloat(dados[0]?.valor ?? '');

      if (Number.isNaN(novaTaxa)) return;

      await db.runAsync(
        `INSERT INTO configuracoes_app (chave, valor)
         VALUES ('taxa_selic_atual', ?)
         ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor;`,
        [String(novaTaxa)],
      );
      await db.runAsync(
        `INSERT INTO configuracoes_app (chave, valor)
         VALUES ('ultima_atualizacao_selic', ?)
         ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor;`,
        [mesAnoAtual],
      );

      logger.info(`[Selic] Atualizada para ${novaTaxa}%`);
    } catch (error) {
      logger.error('[Selic] Erro ao buscar taxa:', error);
    }
  },
};
