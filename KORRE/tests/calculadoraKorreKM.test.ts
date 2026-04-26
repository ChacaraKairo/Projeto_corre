import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CalculadoraMovimento } from '../utils/calculadoraKorreKM';

const baseForm = {
  preco_energia_unidade: 0,
  rendimento_energia_unidade: 1,
  valor_jogo_pneus: 0,
  durabilidade_pneus_km: 0,
  valor_oleo_filtros: 0,
  intervalo_oleo_filtros_km: 0,
  valor_manutencao_freios: 0,
  intervalo_freios_km: 0,
  valor_kit_transmissao: 0,
  durabilidade_transmissao_km: 0,
  fundo_depreciacao_bateria_por_km: 0,
};

describe('CalculadoraMovimento custo por km', () => {
  it('calcula combustivel corretamente', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      preco_energia_unidade: 6,
      rendimento_energia_unidade: 40,
    });

    assert.equal(resultado.breakdown.energiaKm, 0.15);
  });

  it('nao usa fallback 10 quando rendimento esta vazio', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      preco_energia_unidade: 6,
      rendimento_energia_unidade: 0,
    });

    assert.equal(resultado.breakdown.energiaKm, 0);
    assert.ok(
      resultado.avisos.includes('Informe o rendimento do veículo.'),
    );
  });

  it('calcula manutencao periodica', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      valor_oleo_filtros: 60,
      intervalo_oleo_filtros_km: 1000,
    });

    assert.equal(resultado.breakdown.oleoKm, 0.06);
  });

  it('calcula depreciacao mensal por km', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      depreciacao_real_estimada: 300,
      km_estimado_mes: 1500,
    });

    assert.equal(resultado.breakdown.depreciacaoKm, 0.2);
  });

  it('calcula manutencao imprevista mensal por km', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      manutencao_imprevista_mensal: 150,
      km_estimado_mes: 1500,
    });

    assert.equal(
      resultado.breakdown.manutencaoImprevistaKm,
      0.1,
    );
  });

  it('calcula limpeza mensal por km', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      limpeza_higienizacao_mensal: 60,
      km_estimado_mes: 1500,
    });

    assert.equal(resultado.breakdown.limpezaKm, 0.04);
  });

  it('prioriza valor direto por km', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      depreciacao_por_km: 0.25,
      depreciacao_real_estimada: 300,
      km_estimado_mes: 1500,
    });

    assert.equal(resultado.breakdown.depreciacaoKm, 0.25);
  });

  it('soma todos os componentes no IKM', () => {
    const resultado = CalculadoraMovimento.calcularCustoKm({
      ...baseForm,
      preco_energia_unidade: 6,
      rendimento_energia_unidade: 40,
      valor_oleo_filtros: 60,
      intervalo_oleo_filtros_km: 1000,
      valor_jogo_pneus: 500,
      durabilidade_pneus_km: 12000,
      valor_manutencao_freios: 100,
      intervalo_freios_km: 8000,
      valor_kit_transmissao: 250,
      durabilidade_transmissao_km: 18000,
      depreciacao_real_estimada: 300,
      manutencao_imprevista_mensal: 150,
      limpeza_higienizacao_mensal: 60,
      km_estimado_mes: 1500,
      mao_obra_preventiva_por_km: 0.03,
    });

    assert.equal(Number(resultado.ikm.toFixed(4)), 0.6481);
  });
});
