export type TipoNotificacao =
  | 'info'
  | 'alerta'
  | 'sucesso'
  | 'manutencao'
  | 'financeiro'
  | 'backup'
  | 'sistema'
  | 'servidor';

export type OrigemNotificacao = 'local' | 'servidor';

export interface CriarNotificacaoInput {
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  origem?: OrigemNotificacao;
  destino?: string;
  dados?: Record<string, unknown>;
  dedupKey?: string;
}

export interface NotificacaoHistorico
  extends CriarNotificacaoInput {
  id: number;
  lida: number;
  data_criacao: string;
}
