import {
  CircleDot,
  Droplets,
  Fuel,
  Gauge,
  Sparkles,
  Wrench,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
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
    return (
      <AccordionSection
        title="Custos de Movimento (KM)"
        icon={<Gauge size={20} color={palette.brand} />}
        isComplete={isComplete}
        onHelpClick={() =>
          onHelp(
            'Custos de Movimento',
            'Valores consumidos enquanto você roda. Compõem o IKM.',
          )
        }
      >
        <View style={sharedSectionStyles.fieldStack}>
          <InputFinanceiro
            label="Preço do Combustível / kWh"
            value={String(form.preco_energia_unidade || '')}
            onChangeText={(v) =>
              onChange('preco_energia_unidade', v)
            }
            placeholder="R$ 0,00"
            icon={<Fuel size={18} color={palette.surface400} />}
            suffix="R$/L ou kWh"
          />

          <InputFinanceiro
            label="Média de Consumo"
            value={String(
              form.rendimento_energia_unidade || '',
            )}
            onChangeText={(v) =>
              onChange('rendimento_energia_unidade', v)
            }
            placeholder="0.0"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM/L"
          />

          <InputFinanceiro
            label="Valor do Jogo de Pneus"
            value={String(form.valor_jogo_pneus || '')}
            onChangeText={(v) =>
              onChange('valor_jogo_pneus', v)
            }
            placeholder="R$ 0,00"
            icon={
              <CircleDot size={18} color={palette.surface400} />
            }
            suffix="R$"
          />

          <InputFinanceiro
            label="Durabilidade dos Pneus"
            value={String(form.durabilidade_pneus_km || '')}
            onChangeText={(v) =>
              onChange('durabilidade_pneus_km', v)
            }
            placeholder="Ex: 40000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
          />

          <InputFinanceiro
            label="Custo Óleo e Filtros"
            value={String(form.valor_oleo_filtros || '')}
            onChangeText={(v) =>
              onChange('valor_oleo_filtros', v)
            }
            placeholder="R$ 0,00"
            icon={<Droplets size={18} color={palette.surface400} />}
            suffix="R$"
          />

          <InputFinanceiro
            label="Intervalo de Troca (Óleo)"
            value={String(
              form.intervalo_oleo_filtros_km || '',
            )}
            onChangeText={(v) =>
              onChange('intervalo_oleo_filtros_km', v)
            }
            placeholder="Ex: 10000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
          />

          <InputFinanceiro
            label="Valor Freios (Pastilha/Disco)"
            value={String(
              form.valor_manutencao_freios || '',
            )}
            onChangeText={(v) =>
              onChange('valor_manutencao_freios', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$"
          />

          <InputFinanceiro
            label="Intervalo de Troca (Freios)"
            value={String(form.intervalo_freios_km || '')}
            onChangeText={(v) =>
              onChange('intervalo_freios_km', v)
            }
            placeholder="Ex: 20000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
          />

          <InputFinanceiro
            label="Kit Transmissão / Correia"
            value={String(form.valor_kit_transmissao || '')}
            onChangeText={(v) =>
              onChange('valor_kit_transmissao', v)
            }
            placeholder="R$ 0,00"
            icon={<Wrench size={18} color={palette.surface400} />}
            suffix="R$"
          />

          <InputFinanceiro
            label="Durabilidade Transmissão"
            value={String(
              form.durabilidade_transmissao_km || '',
            )}
            onChangeText={(v) =>
              onChange('durabilidade_transmissao_km', v)
            }
            placeholder="Ex: 35000"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="KM"
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
            suffix="KM"
            onHelp={() =>
              onHelp(
                'KM estimado por mês',
                'Se vazio, o KORRE calcula usando km por dia × dias por semana.',
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
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Depreciação mensal estimada',
                'Quanto o veículo perde de valor por mês pelo uso.',
              )
            }
          />

          <InputFinanceiro
            label="Depreciação por km"
            value={String(form.depreciacao_por_km || '')}
            onChangeText={(v) =>
              onChange('depreciacao_por_km', v)
            }
            placeholder="R$ 0,00"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Depreciação por km',
                'Use apenas se você já sabe o valor exato por km. Se preencher, ele tem prioridade sobre a depreciação mensal.',
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
            suffix="R$"
            onHelp={() =>
              onHelp(
                'Reserva mensal para imprevistos',
                'Valor reservado para problemas não previstos.',
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
            placeholder="R$ 0,00"
            icon={<Gauge size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Imprevistos por km',
                'Use se preferir informar diretamente por km.',
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
            placeholder="R$ 0,00"
            icon={<Sparkles size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Mão de obra preventiva por km',
                'Valor médio de mão de obra diluído por km.',
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
            suffix="R$"
          />

          <InputFinanceiro
            label="Limpeza por km"
            value={String(
              form.limpeza_higienizacao_por_km || '',
            )}
            onChangeText={(v) =>
              onChange('limpeza_higienizacao_por_km', v)
            }
            placeholder="R$ 0,00"
            icon={<Droplets size={18} color={palette.surface400} />}
            suffix="R$/KM"
            onHelp={() =>
              onHelp(
                'Limpeza por km',
                'Use se quiser informar diretamente por km.',
              )
            }
          />
        </View>
      </AccordionSection>
    );
  },
);

SecaoCustosAtivo.displayName = 'SecaoCustosAtivo';
