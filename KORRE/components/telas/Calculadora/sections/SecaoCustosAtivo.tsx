import {
  CircleDot,
  Droplets,
  Fuel,
  Gauge,
  Sparkles,
  Wrench,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { AJUDA_CALCULADORA } from '../../../../constants/calculadoraAjuda';
import { palette } from '../../../../styles/tokens';
import { sharedSectionStyles } from '../../../../styles/telas/Calculadora/sections/sharedSectionStyles';
import { FormularioViabilidade } from '../../../../type/viabilidadeCorrida';
import { AccordionSection } from '../ui/AccordionSection';
import { InputFinanceiro } from '../ui/InputFinanceiro';

interface SecaoCustosAtivoProps {
  form: Partial<FormularioViabilidade>;
  onChange: (
    campo: keyof FormularioViabilidade,
    valor: string,
  ) => void;
  onHelp: (titulo: string, texto: string) => void;
  isComplete: boolean;
}

export const SecaoCustosAtivo = memo(
  ({
    form,
    onChange,
    onHelp,
    isComplete,
  }: SecaoCustosAtivoProps) => {
    const { t } = useTranslation();

    return (
      <AccordionSection
        title={t('calculadora.custos_movimento')}
        icon={<Gauge size={20} color={palette.brand} />}
        isComplete={isComplete}
        onHelpClick={() =>
          onHelp(
            t('calculadora.custos_movimento'),
            AJUDA_CALCULADORA.custosMovimento,
          )
        }
      >
        <View style={sharedSectionStyles.fieldStack}>
          <InputFinanceiro
            label="Preço do combustível / kWh"
            value={String(form.preco_energia_unidade || '')}
            onChangeText={(v) =>
              onChange('preco_energia_unidade', v)
            }
            placeholder="R$ 0,00"
            icon={<Fuel size={18} color={palette.surface400} />}
            suffix="R$/L ou kWh"
            onHelp={() =>
              onHelp(
                'Preço do combustível / kWh',
                AJUDA_CALCULADORA.precoEnergia,
              )
            }
          />

          <InputFinanceiro
            label="Média de consumo"
            value={String(
              form.rendimento_energia_unidade || '',
            )}
            onChangeText={(v) =>
              onChange('rendimento_energia_unidade', v)
            }
            placeholder="Ex: 40"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM/L ou KM/kWh"
            onHelp={() =>
              onHelp(
                'Média de consumo',
                AJUDA_CALCULADORA.rendimento,
              )
            }
          />

          <InputFinanceiro
            label="Valor do jogo de pneus"
            value={String(form.valor_jogo_pneus || '')}
            onChangeText={(v) =>
              onChange('valor_jogo_pneus', v)
            }
            placeholder="R$ 0,00"
            icon={
              <CircleDot size={18} color={palette.surface400} />
            }
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Valor do jogo de pneus',
                AJUDA_CALCULADORA.valorPneus,
              )
            }
          />

          <InputFinanceiro
            label="Durabilidade dos pneus"
            value={String(form.durabilidade_pneus_km || '')}
            onChangeText={(v) =>
              onChange('durabilidade_pneus_km', v)
            }
            placeholder="Ex: 40000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
            onHelp={() =>
              onHelp(
                'Durabilidade dos pneus',
                AJUDA_CALCULADORA.durabilidadePneus,
              )
            }
          />

          <InputFinanceiro
            label="Custo óleo e filtros"
            value={String(form.valor_oleo_filtros || '')}
            onChangeText={(v) =>
              onChange('valor_oleo_filtros', v)
            }
            placeholder="R$ 0,00"
            icon={<Droplets size={18} color={palette.surface400} />}
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Custo óleo e filtros',
                AJUDA_CALCULADORA.oleoFiltros,
              )
            }
          />

          <InputFinanceiro
            label="Intervalo de troca (óleo)"
            value={String(
              form.intervalo_oleo_filtros_km || '',
            )}
            onChangeText={(v) =>
              onChange('intervalo_oleo_filtros_km', v)
            }
            placeholder="Ex: 10000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
            onHelp={() =>
              onHelp(
                'Intervalo de troca (óleo)',
                AJUDA_CALCULADORA.intervaloOleo,
              )
            }
          />

          <InputFinanceiro
            label="Valor freios (pastilha/disco)"
            value={String(
              form.valor_manutencao_freios || '',
            )}
            onChangeText={(v) =>
              onChange('valor_manutencao_freios', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Valor freios',
                AJUDA_CALCULADORA.freios,
              )
            }
          />

          <InputFinanceiro
            label="Intervalo de troca (freios)"
            value={String(form.intervalo_freios_km || '')}
            onChangeText={(v) =>
              onChange('intervalo_freios_km', v)
            }
            placeholder="Ex: 20000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
            onHelp={() =>
              onHelp(
                'Intervalo de troca (freios)',
                AJUDA_CALCULADORA.intervaloFreios,
              )
            }
          />

          <InputFinanceiro
            label="Kit transmissão / correia"
            value={String(form.valor_kit_transmissao || '')}
            onChangeText={(v) =>
              onChange('valor_kit_transmissao', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Kit transmissão / correia',
                AJUDA_CALCULADORA.transmissao,
              )
            }
          />

          <InputFinanceiro
            label="Durabilidade transmissão"
            value={String(
              form.durabilidade_transmissao_km || '',
            )}
            onChangeText={(v) =>
              onChange('durabilidade_transmissao_km', v)
            }
            placeholder="Ex: 35000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
            onHelp={() =>
              onHelp(
                'Durabilidade transmissão',
                AJUDA_CALCULADORA.durabilidadeTransmissao,
              )
            }
          />

          <Text style={sharedSectionStyles.subsectionTitle}>
            Desgaste real e reservas
          </Text>

          <InputFinanceiro
            label="KM estimado por mês"
            value={String(form.km_estimado_mes || '')}
            onChangeText={(v) => onChange('km_estimado_mes', v)}
            placeholder="Ex: 1500"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM/mês"
            onHelp={() =>
              onHelp(
                'KM estimado por mês',
                AJUDA_CALCULADORA.kmEstimadoMes,
              )
            }
          />

          <InputFinanceiro
            label="Depreciação mensal estimada"
            value={String(
              form.depreciacao_real_estimada || '',
            )}
            onChangeText={(v) =>
              onChange('depreciacao_real_estimada', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$/mês"
            onHelp={() =>
              onHelp(
                'Depreciação mensal estimada',
                AJUDA_CALCULADORA.depreciacaoMensal,
              )
            }
          />

          <InputFinanceiro
            label="Depreciação por km"
            value={String(form.depreciacao_por_km || '')}
            onChangeText={(v) =>
              onChange('depreciacao_por_km', v)
            }
            placeholder="Ex: 0,20"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Depreciação por km',
                AJUDA_CALCULADORA.depreciacaoKm,
              )
            }
          />

          <InputFinanceiro
            label="Reserva mensal para imprevistos"
            value={String(
              form.manutencao_imprevista_mensal || '',
            )}
            onChangeText={(v) =>
              onChange('manutencao_imprevista_mensal', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$/mês"
            onHelp={() =>
              onHelp(
                'Reserva mensal para imprevistos',
                AJUDA_CALCULADORA.manutencaoImprevistaMensal,
              )
            }
          />

          <InputFinanceiro
            label="Imprevistos por km"
            value={String(
              form.manutencao_imprevista_por_km || '',
            )}
            onChangeText={(v) =>
              onChange('manutencao_imprevista_por_km', v)
            }
            placeholder="Ex: 0,10"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Imprevistos por km',
                AJUDA_CALCULADORA.manutencaoImprevistaKm,
              )
            }
          />

          <InputFinanceiro
            label="Mão de obra preventiva por km"
            value={String(
              form.mao_obra_preventiva_por_km || '',
            )}
            onChangeText={(v) =>
              onChange('mao_obra_preventiva_por_km', v)
            }
            placeholder="Ex: 0,03"
            icon={<Sparkles size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Mão de obra preventiva por km',
                AJUDA_CALCULADORA.maoObraPreventivaKm,
              )
            }
          />

          <InputFinanceiro
            label="Limpeza/higienização mensal"
            value={String(
              form.limpeza_higienizacao_mensal || '',
            )}
            onChangeText={(v) =>
              onChange('limpeza_higienizacao_mensal', v)
            }
            placeholder="R$ 0,00"
            icon={<Droplets size={18} color={palette.surface400} />}
            suffix="R$/mês"
            onHelp={() =>
              onHelp(
                'Limpeza/higienização mensal',
                AJUDA_CALCULADORA.limpezaMensal,
              )
            }
          />

          <InputFinanceiro
            label="Limpeza por km"
            value={String(
              form.limpeza_higienizacao_por_km || '',
            )}
            onChangeText={(v) =>
              onChange('limpeza_higienizacao_por_km', v)
            }
            placeholder="Ex: 0,04"
            icon={<Droplets size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Limpeza por km',
                AJUDA_CALCULADORA.limpezaKm,
              )
            }
          />
        </View>
      </AccordionSection>
    );
  },
);

SecaoCustosAtivo.displayName = 'SecaoCustosAtivo';
