import {
  Banknote,
  Calendar,
  Clock,
  Coffee,
  HeartPulse,
  Route,
  User,
  Utensils,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { AJUDA_CALCULADORA } from '../../../../constants/calculadoraAjuda';
import { palette } from '../../../../styles/tokens';
import { sharedSectionStyles } from '../../../../styles/telas/Calculadora/sections/sharedSectionStyles';
import { FormularioViabilidade } from '../../../../type/viabilidadeCorrida';
import { AccordionSection } from '../ui/AccordionSection';
import { InputFinanceiro } from '../ui/InputFinanceiro';

interface SecaoCustoPessoaProps {
  form: Partial<FormularioViabilidade>;
  onChange: (
    campo: keyof FormularioViabilidade,
    valor: string,
  ) => void;
  onHelp: (titulo: string, texto: string) => void;
  isComplete: boolean;
}

export const SecaoCustoPessoa = memo(
  ({
    form,
    onChange,
    onHelp,
    isComplete,
  }: SecaoCustoPessoaProps) => {
    return (
      <AccordionSection
        title="Fator Humano (Você)"
        icon={<User size={20} color={palette.brand} />}
        isComplete={isComplete}
        onHelpClick={() =>
          onHelp('Fator Humano', AJUDA_CALCULADORA.fatorHumano)
        }
      >
        <View style={sharedSectionStyles.fieldStack}>
          <InputFinanceiro
            label="Alimentação principal"
            value={String(form.alimentacao_diaria || '')}
            onChangeText={(v) =>
              onChange('alimentacao_diaria', v)
            }
            placeholder="R$ 0,00"
            icon={<Utensils size={18} color={palette.surface400} />}
            suffix="R$/dia"
            onHelp={() =>
              onHelp(
                'Alimentação principal',
                AJUDA_CALCULADORA.alimentacao,
              )
            }
          />

          <InputFinanceiro
            label="Apoio diário (água, café)"
            value={String(form.consumo_apoio_diario || '')}
            onChangeText={(v) =>
              onChange('consumo_apoio_diario', v)
            }
            placeholder="R$ 0,00"
            icon={<Coffee size={18} color={palette.surface400} />}
            suffix="R$/dia"
            onHelp={() =>
              onHelp(
                'Apoio diário',
                AJUDA_CALCULADORA.apoioDiario,
              )
            }
          />

          <InputFinanceiro
            label="Plano de saúde / reserva"
            value={String(form.plano_saude_mensal || '')}
            onChangeText={(v) =>
              onChange('plano_saude_mensal', v)
            }
            placeholder="R$ 0,00"
            icon={<HeartPulse size={18} color={palette.surface400} />}
            suffix="R$/mês"
            onHelp={() =>
              onHelp(
                'Plano de saúde / reserva',
                AJUDA_CALCULADORA.planoSaude,
              )
            }
          />

          <InputFinanceiro
            label="Salário líquido desejado"
            value={String(
              form.salario_liquido_mensal_desejado || '',
            )}
            onChangeText={(v) =>
              onChange('salario_liquido_mensal_desejado', v)
            }
            placeholder="Ex: 3500"
            icon={<Banknote size={18} color={palette.brand} />}
            suffix="R$/mês"
            onHelp={() =>
              onHelp(
                'Salário líquido desejado',
                AJUDA_CALCULADORA.salarioDesejado,
              )
            }
          />

          <InputFinanceiro
            label="KM por dia"
            value={String(form.km_por_dia || '')}
            onChangeText={(v) => onChange('km_por_dia', v)}
            placeholder="Ex: 120"
            icon={<Route size={18} color={palette.surface400} />}
            suffix="KM/dia"
            onHelp={() =>
              onHelp(
                'KM por dia',
                'Informe a média de quilômetros rodados em um dia normal de trabalho.\n\nComo descobrir: anote o KM inicial e final do odômetro por alguns dias e faça uma média. Inclua deslocamentos sem passageiro, ida até região de trabalho e retorno para casa.\n\nSe você preencher o KM estimado por mês na seção de desgaste, este campo ainda ajuda o KORRE a entender sua rotina.',
              )
            }
          />

          <InputFinanceiro
            label="Dias de trabalho / semana"
            value={String(
              form.dias_trabalhados_semana || '',
            )}
            onChangeText={(v) =>
              onChange('dias_trabalhados_semana', v)
            }
            placeholder="Ex: 5"
            icon={<Calendar size={18} color={palette.surface400} />}
            suffix="dias"
            onHelp={() =>
              onHelp(
                'Dias de trabalho / semana',
                AJUDA_CALCULADORA.diasTrabalho,
              )
            }
          />

          <InputFinanceiro
            label="Horas de trabalho / dia"
            value={String(form.horas_por_dia || '')}
            onChangeText={(v) =>
              onChange('horas_por_dia', v)
            }
            placeholder="Ex: 8"
            icon={<Clock size={18} color={palette.surface400} />}
            suffix="horas"
            onHelp={() =>
              onHelp(
                'Horas de trabalho / dia',
                AJUDA_CALCULADORA.horasDia,
              )
            }
          />
        </View>
      </AccordionSection>
    );
  },
);

SecaoCustoPessoa.displayName = 'SecaoCustoPessoa';
