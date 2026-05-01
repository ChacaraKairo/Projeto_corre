import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useTermometroMEI } from '../../../hooks/relatorios/useTermometroMEI';
import {
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Calendar,
} from 'lucide-react-native';

import { styles } from '../../../styles/generated/components/telas/Relatorios/temometro_meiStyles';
import { inlineStyles } from '../../../styles/generated-inline/components/telas/Relatorios/temometro_meiInlineStyles';
const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export function TermometroMEI() {
  const { dados, loading } = useTermometroMEI();

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#10B981" />
        <Text style={styles.loadingText}>
          Analisando faturamento MEI...
        </Text>
      </View>
    );

  const getCor = (percent: number) => {
    if (percent >= 90) return '#EF4444'; // Perigo
    if (percent >= 75) return '#F59E0B'; // Atenção
    return '#10B981'; // Seguro
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Termômetro MEI</Text>
          <Text style={styles.subtitle}>
            Ano Fiscal 2026
          </Text>
        </View>
        {(dados.projecaoEstouro || dados.alerta) && (
          <AlertTriangle color="#EF4444" size={24} />
        )}
      </View>

      {/* --- FATURAMENTO MENSAL (Média R$ 6.750) --- */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Mês Atual</Text>
          <Text
            style={[
              styles.valor,
              { color: getCor(dados.mensal.porcentagem) },
            ]}
          >
            {dados.mensal.porcentagem.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${dados.mensal.porcentagem}%`,
                backgroundColor: getCor(
                  dados.mensal.porcentagem,
                ),
              },
            ]}
          />
        </View>
        <Text style={styles.subTextInline}>
          {formatarMoeda(dados.mensal.total)} de{' '}
          {formatarMoeda(dados.mensal.limite)}
        </Text>
      </View>

      {/* --- FATURAMENTO ANUAL (R$ 81.000 ou Proporcional) --- */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Acumulado no Ano</Text>
          <Text
            style={[
              styles.valor,
              { color: getCor(dados.anual.porcentagem) },
            ]}
          >
            {dados.anual.porcentagem.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${dados.anual.porcentagem}%`,
                backgroundColor: getCor(
                  dados.anual.porcentagem,
                ),
              },
            ]}
          />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.subText}>
            Total: {formatarMoeda(dados.anual.total)}
          </Text>
          <Text style={styles.subText}>
            Limite: {formatarMoeda(dados.anual.limite)}
          </Text>
        </View>
      </View>

      {/* --- BOX DE STATUS / ALERTAS --- */}
      {dados.projecaoEstouro ? (
        <View style={[styles.alertBox, styles.alertError]}>
          <TrendingUp color="#EF4444" size={20} />
          <Text style={styles.alertText}>
            <Text style={inlineStyles.inline1}>
              Risco de Desenquadramento:{' '}
            </Text>
            No ritmo atual, sua projeção anual excede o
            limite do MEI.
          </Text>
        </View>
      ) : dados.alerta ? (
        <View
          style={[styles.alertBox, styles.alertWarning]}
        >
          <AlertTriangle color="#B45309" size={20} />
          <Text
            style={[styles.alertText, { color: '#B45309' }]}
          >
            Você atingiu 80% do limite. Planeje seus
            próximos faturamentos com cautela.
          </Text>
        </View>
      ) : (
        <View
          style={[styles.alertBox, styles.alertSuccess]}
        >
          <CheckCircle color="#10B981" size={20} />
          <Text
            style={[styles.alertText, { color: '#166534' }]}
          >
            Faturamento saudável. Você está operando dentro
            da margem de segurança.
          </Text>
        </View>
      )}

      {dados.proporcional.mesesAtivos < 12 && (
        <View style={styles.proporcionalInfo}>
          <Calendar color="#6B7280" size={14} />
          <Text style={styles.proporcionalText}>
            Limite proporcional a{' '}
            {dados.proporcional.mesesAtivos} meses de
            atividade.
          </Text>
        </View>
      )}
    </View>
  );
}


