import db from '../../database/DatabaseInit';
import { logger } from '../../utils/logger';

export interface DadosNovoVeiculo {
  tipo: string;
  marca: string;
  modelo: string;
  ano: string | number;
  motor: string;
  placa: string;
  km_atual: number;
  ativo?: number;
  id_user: number;
}

export const VeiculoService = {
  inserirVeiculo: async (dados: DadosNovoVeiculo) => {
    try {
      const result = await db.runAsync(
        `INSERT INTO veiculos (tipo, marca, modelo, ano, motor, placa, km_atual, ativo, id_user)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          dados.tipo,
          dados.marca || '',
          dados.modelo,
          Number.parseInt(String(dados.ano), 10) || 0,
          dados.motor || '',
          (dados.placa || '').toUpperCase().trim(),
          dados.km_atual || 0,
          dados.ativo ?? 0,
          dados.id_user,
        ],
      );

      return result.lastInsertRowId;
    } catch (error) {
      logger.error(
        '[VeiculoService] Erro crítico ao inserir veículo:',
        error,
      );
      throw error;
    }
  },
};
