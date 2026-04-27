import {
  BadgePercent,
  Coins,
  Landmark,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { AJUDA_CALCULADORA } from '../../../../constants/calculadoraAjuda';
import { palette } from '../../../../styles/tokens';
import { sharedSectionStyles } from '../../../../styles/telas/Calculadora/sections/sharedSectionStyles';
import { FormularioViabilidade } from '../../../../type/viabilidadeCorrida';
import { AccordionSection } from '../ui/AccordionSection';
import { InputFinanceiro } from '../ui/InputFinanceiro';

interface SecaoPatrimonioProps {
  form: Partial<FormularioViabilidade>;
  onChange: (
    campo: keyof FormularioViabilidade,
    valor: string,
  ) => void;
  onHelp: (titulo: string, texto: string) => void;
  isComplete: boolean;
}

export const SecaoPatrimonio = memo(
  ({
    form,
    onChange,
    onHelp,
    isComplete,
  }: SecaoPatrimonioProps) => {
    return (
      <AccordionSection
        title="Patrimônio e Capital"
        icon={<Coins size={20} color={palette.brand} />}
        isComplete={isComplete}
        onHelpClick={() =>
          onHelp(
            'Patrimônio e Capital',
            AJUDA_CALCULADORA.patrimonio,
          )
        }
      >
        <View style={sharedSectionStyles.fieldStack}>
          <InputFinanceiro
            label="Valor do veículo (Tabela FIPE)"
            value={String(form.valor_veiculo_fipe || '')}
            onChangeText={(v) =>
              onChange('valor_veiculo_fipe', v)
            }
            placeholder="R$ 0,00"
            icon={<Landmark size={18} color={palette.surface400} />}
            suffix="R$"
            onHelp={() =>
              onHelp('Valor FIPE', AJUDA_CALCULADORA.valorFipe)
            }
          />

          <InputFinanceiro
            label="Taxa Selic anual"
            value={String(
              form.custo_oportunidade_selic || '',
            )}
            onChangeText={(v) =>
              onChange('custo_oportunidade_selic', v)
            }
            placeholder="Ex: 10,75"
            icon={
              <BadgePercent size={18} color={palette.brand} />
            }
            suffix="%"
            onHelp={() =>
              onHelp('Taxa Selic', AJUDA_CALCULADORA.selic)
            }
          />
        </View>
      </AccordionSection>
    );
  },
);

SecaoPatrimonio.displayName = 'SecaoPatrimonio';
