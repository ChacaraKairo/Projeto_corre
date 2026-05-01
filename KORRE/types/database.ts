export type TipoMeta = 'diaria' | 'semanal';

export type TipoTransacao = 'ganho' | 'despesa';

export interface PerfilUsuario {
  id: number;
  nome: string;
  email?: string | null;
  cpf?: string | null;
  foto_uri?: string | null;
  tipo_meta?: TipoMeta | null;
  meta_diaria?: number | null;
  meta_semanal?: number | null;
}

export interface UsuarioLocal {
  id: number;
}

export interface Veiculo {
  id: number;
  tipo: string;
  marca: string | null;
  modelo: string;
  ano: string | number | null;
  motor: string | null;
  placa: string | null;
  km_atual: number;
  ativo: number;
  id_user?: number | null;
  custo_km_calculado?: number | null;
  custo_minuto_calculado?: number | null;
  meta_ganho_minuto_calculado?: number | null;
  taxa_completude?: number | null;
}

export interface NovoVeiculo {
  tipo: string;
  marca: string;
  modelo: string;
  ano: string | number;
  motor: string;
  placa: string;
  km_atual: number;
  ativo?: number;
  id_user?: number;
}

export interface CategoriaFinanceira {
  id: number;
  nome: string;
  tipo: TipoTransacao;
  icone?: string | null;
  cor?: string | null;
}

export interface MovimentacaoFinanceira {
  id: number;
  tipo: TipoTransacao;
  valor: number;
  categoria: string | null;
  hora: string | null;
}
