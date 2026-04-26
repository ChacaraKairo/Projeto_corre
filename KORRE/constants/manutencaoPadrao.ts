import { TipoVeiculo } from '../type/typeVeiculos';

export interface ManutencaoPadrao {
  nome: string;
  icone: string;
  intervalo_km: number | null;
  intervalo_meses: number | null;
  criticidade: 'alta' | 'media' | 'baixa';
}

const item = (
  nome: string,
  icone = 'wrench',
  criticidade: ManutencaoPadrao['criticidade'] = 'media',
): ManutencaoPadrao => ({
  nome,
  icone,
  intervalo_km: null,
  intervalo_meses: null,
  criticidade,
});

export const MANUTENCOES_PADRAO: Record<
  TipoVeiculo,
  ManutencaoPadrao[]
> = {
  moto: [
    item('Óleo', 'droplets', 'alta'),
    item('Filtro de ar', 'wrench'),
    item('Pneu dianteiro', 'circle-dot', 'alta'),
    item('Pneu traseiro', 'circle-dot', 'alta'),
    item('Pastilha/sapata de freio', 'disc', 'alta'),
    item('Relação/corrente/coroa/pinhão', 'cog', 'alta'),
    item('Vela', 'zap'),
    item('Bateria', 'zap'),
    item('Rolamentos', 'circle-dot'),
    item('Amortecedores', 'activity'),
    item('Mão de obra preventiva', 'wrench'),
    item('Lavagem/lubrificação', 'droplets'),
  ],
  carro: [
    item('Óleo', 'droplets', 'alta'),
    item('Filtros', 'wrench'),
    item('Pneus', 'circle-dot', 'alta'),
    item('Pastilhas de freio', 'disc', 'alta'),
    item('Discos de freio', 'disc'),
    item('Bateria', 'zap'),
    item('Amortecedores', 'activity'),
    item('Alinhamento/balanceamento', 'activity'),
    item('Correia dentada', 'cog', 'alta'),
    item('Velas', 'zap'),
    item('Embreagem', 'cog'),
    item('Fluido de arrefecimento', 'droplets'),
    item('Mão de obra preventiva', 'wrench'),
    item('Lavagem', 'droplets'),
  ],
  bicicleta: [
    item('Pneus', 'circle-dot', 'alta'),
    item('Câmara', 'circle-dot'),
    item('Corrente', 'cog', 'alta'),
    item('Cassete/catraca', 'cog'),
    item('Pastilhas de freio', 'disc', 'alta'),
    item('Cabos', 'activity'),
    item('Revisão geral', 'wrench'),
    item('Lubrificação', 'droplets'),
  ],
  van: [
    item('Óleo', 'droplets', 'alta'),
    item('Filtros', 'wrench'),
    item('Pneus', 'circle-dot', 'alta'),
    item('Freios', 'disc', 'alta'),
    item('Suspensão', 'activity'),
    item('Embreagem', 'cog'),
    item('Bateria', 'zap'),
    item('Mão de obra preventiva', 'wrench'),
    item('Lavagem', 'droplets'),
  ],
  carro_eletrico: [
    item('Pneus', 'circle-dot', 'alta'),
    item('Freios', 'disc'),
    item('Suspensão', 'activity'),
    item('Bateria auxiliar', 'zap'),
    item('Fundo de bateria principal', 'zap', 'alta'),
    item('Alinhamento/balanceamento', 'activity'),
    item('Mão de obra preventiva', 'wrench'),
  ],
};

export const SUGESTOES_MANUTENCAO_PADRAO =
  MANUTENCOES_PADRAO;
