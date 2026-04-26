import { Clock, Gauge, TrendingUp } from 'lucide-react-native';
import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';
import { palette } from '../../../../styles/tokens';
import { painelResultadoFlutuanteStyles as styles } from '../../../../styles/telas/Calculadora/layout/painelResultadoFlutuanteStyles';
import { FormularioViabilidade } from '../../../../type/viabilidadeCorrida';
import { CalculadoraMovimento } from '../../../../utils/calculadoraKorreKM';
import { CalculadoraTempo } from '../../../../utils/calculadoraKorreTempo';

interface Props {
  form: Partial<FormularioViabilidade>;
  veiculoTipo: string;
}

export const PainelResultadoFlutuante = memo(
  ({ form }: Props) => {
    const { tema } = useTema();
    const isDark = tema === 'escuro';

    const resultados = useMemo(() => {
      try {
        const { ikm } =
          CalculadoraMovimento.calcularCustoKm(form as any);
        const { imin } =
          CalculadoraTempo.calcularCustoMinuto(form as any);
        return { ikm: ikm || 0, imin: imin || 0 };
      } catch {
        return { ikm: 0, imin: 0 };
      }
    }, [form]);

    const bgColor = isDark ? palette.surface850 : palette.white;
    const textColor = isDark ? palette.white : palette.surface750;
    const subTextColor = isDark
      ? palette.surface300
      : palette.surface400;
    const dividerColor = isDark
      ? palette.surface600
      : palette.surface200;

    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Gauge size={16} color={palette.brand} />
            </View>
            <View>
              <Text style={[styles.label, { color: subTextColor }]}>
                IKM (Custo KM)
              </Text>
              <Text style={[styles.value, { color: textColor }]}>
                R$ {resultados.ikm.toFixed(2)}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: dividerColor },
            ]}
          />

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Clock size={16} color={palette.brand} />
            </View>
            <View>
              <Text style={[styles.label, { color: subTextColor }]}>
                IMIN (Custo Min)
              </Text>
              <Text style={[styles.value, { color: textColor }]}>
                R$ {resultados.imin.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.efficiencyBadge}>
            <TrendingUp size={14} color={palette.white} />
            <Text style={styles.efficiencyText}>LIVE</Text>
          </View>
        </View>
      </View>
    );
  },
);

PainelResultadoFlutuante.displayName =
  'PainelResultadoFlutuante';
