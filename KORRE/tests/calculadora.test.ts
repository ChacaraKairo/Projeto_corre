import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  divisaoSegura,
  toNumber,
} from '../utils/indices/util';
import { CalculadoraMovimento } from '../utils/calculadoraKorreKM';
import { CalculadoraTempo } from '../utils/calculadoraKorreTempo';

describe('indices utils', () => {
  it('normaliza numeros em formatos comuns no Brasil', () => {
    assert.equal(toNumber('1.234,56'), 1234.56);
    assert.equal(toNumber('12,5'), 12.5);
    assert.equal(toNumber('1.234.567'), 1234567);
    assert.equal(toNumber('abc'), 0);
    assert.equal(toNumber(null), 0);
  });

  it('evita divisao por zero', () => {
    assert.equal(divisaoSegura(10, 2), 5);
    assert.equal(divisaoSegura(10, 0), 0);
  });
});

describe('CalculadoraMovimento', () => {
  it('calcula custo por km somando energia, manutencao e bateria', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      preco_energia_unidade: 5,
      rendimento_energia_unidade: 10,
      valor_jogo_pneus: 600,
      durabilidade_pneus_km: 12000,
      valor_oleo_filtros: 100,
      intervalo_oleo_filtros_km: 2000,
      valor_manutencao_freios: 80,
      intervalo_freios_km: 4000,
      valor_kit_transmissao: 300,
      durabilidade_transmissao_km: 10000,
      fundo_depreciacao_bateria_por_km: 0.1,
    });

    assert.equal(Number(resultado.ikm.toFixed(2)), 0.75);
  });
});

describe('CalculadoraTempo', () => {
  it('calcula custo por minuto e meta por minuto', () => {
    const resultado = CalculadoraTempo.calcularCustoMinuto({
      dias_trabalhados_semana: 5,
      horas_por_dia: 8,
      tipo_aquisicao: 'proprio_quitado',
      valor_veiculo_fipe: 12000,
      custo_oportunidade_selic: 12,
      juros_financiamento_mensal: 0,
      diaria_aluguel: 0,
      caucao_aluguel_mensalizado: 0,
      taxa_administracao_consorcio: 0,
      custo_reparacao_emprestimo: 0,
      ipva_anual: 240,
      licenciamento_detran_anual: 120,
      taxas_alvaras_municipais_anual: 0,
      taxa_vistoria_gnv_anual: 0,
      imposto_mei_mensal: 80,
      imposto_renda_mensal: 0,
      seguro_comercial_anual: 1200,
      rastreador_telemetria_mensal: 50,
      plano_dados_mensal: 40,
      valor_smartphone: 1800,
      vida_util_smartphone_meses: 18,
      alimentacao_diaria: 25,
      plano_saude_mensal: 200,
      salario_liquido_mensal_desejado: 3000,
    });

    assert.equal(
      Number(resultado.custoTotalTempoMensal.toFixed(2)),
      1261.25,
    );
    assert.equal(Number(resultado.imin.toFixed(4)), 0.1214);
    assert.equal(Number(resultado.metaMinuto.toFixed(4)), 0.2887);
  });
});
