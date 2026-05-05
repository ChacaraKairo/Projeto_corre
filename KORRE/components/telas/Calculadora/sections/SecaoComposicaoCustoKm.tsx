import { AlertTriangle, Gauge } from 'lucide-react-native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';
import { palette, spacing } from '../../../../styles/tokens';
import { BreakdownCustoKm } from '../../../../utils/calculadoraKorreKM';
import { AccordionSection } from '../ui/AccordionSection';

interface Props {
  breakdown: BreakdownCustoKm | null;
  avisos: string[];
}

const formatCurrency = (value = 0) =>
  `R$ ${Number(value || 0).toFixed(4)}`;

const itens = [
  ['Energia/combustível por km', 'energiaKm'],
  ['Pneus por km', 'pneusKm'],
  ['Óleo/filtros por km', 'oleoKm'],
  ['Freios por km', 'freiosKm'],
  ['Transmissão por km', 'transmissaoKm'],
  ['Peças extras por km', 'pecasExtrasKm'],
  ['Bateria elétrica por km', 'bateriaEletricaKm'],
  ['Depreciação por km', 'depreciacaoKm'],
  ['Manutenção imprevista por km', 'manutencaoImprevistaKm'],
  ['Mão de obra preventiva por km', 'maoObraPreventivaKm'],
  ['Limpeza/higienização por km', 'limpezaKm'],
] as const;

export const SecaoComposicaoCustoKm = memo(
  ({ breakdown, avisos }: Props) => {
    const { t } = useTranslation();
    const { tema } = useTema();
    const isDark = tema === 'escuro';
    const textColor = isDark ? palette.white : palette.surface750;
    const mutedColor = isDark
      ? palette.surface300
      : palette.surface500;
    const total = breakdown
      ? Object.values(breakdown).reduce(
          (acc, valor) => acc + valor,
          0,
        )
      : 0;

    return (
      <AccordionSection
        title={t('calculadora.composicao_km')}
        icon={<Gauge size={20} color={palette.brand} />}
        isComplete={avisos.length === 0}
        onHelpClick={() => undefined}
      >
        <View style={styles.stack}>
          <Text style={[styles.explicacao, { color: mutedColor }]}>
            O custo por km representa apenas os custos ligados ao
            deslocamento e desgaste do veículo. O valor mínimo real
            de uma corrida também considera o custo por minuto,
            tempo parado e sua meta de lucro.
          </Text>

          {avisos.length > 0 && (
            <View
              style={[
                styles.avisoBox,
                {
                  backgroundColor: isDark
                    ? 'rgba(245, 158, 11, 0.12)'
                    : '#FFF7ED',
                  borderColor: '#F59E0B',
                },
              ]}
            >
              <View style={styles.avisoHeader}>
                <AlertTriangle size={16} color="#F59E0B" />
                <Text style={styles.avisoTitle}>
                  Seu custo por km pode estar subestimado
                </Text>
              </View>
              {avisos.map((aviso) => (
                <Text
                  key={aviso}
                  style={[styles.avisoText, { color: textColor }]}
                >
                  • {aviso}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.lista}>
            {itens.map(([label, key]) => (
              <View key={key} style={styles.linha}>
                <Text style={[styles.label, { color: mutedColor }]}>
                  {label}
                </Text>
                <Text style={[styles.valor, { color: textColor }]}>
                  {formatCurrency(breakdown?.[key])}
                </Text>
              </View>
            ))}

            <View style={styles.totalLinha}>
              <Text style={styles.totalLabel}>{t('calculadora.total_ikm')}</Text>
              <Text style={styles.totalValor}>
                {formatCurrency(total)}
              </Text>
            </View>
          </View>
        </View>
      </AccordionSection>
    );
  },
);

SecaoComposicaoCustoKm.displayName =
  'SecaoComposicaoCustoKm';

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
  explicacao: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  avisoBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    gap: spacing.xs,
  },
  avisoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  avisoTitle: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  avisoText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  lista: {
    gap: spacing.sm,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
  },
  valor: {
    fontSize: 12,
    fontWeight: '900',
  },
  totalLinha: {
    borderTopWidth: 1,
    borderTopColor: palette.surface200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingTop: spacing.md,
  },
  totalLabel: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  totalValor: {
    color: palette.brand,
    fontSize: 13,
    fontWeight: '900',
  },
});
