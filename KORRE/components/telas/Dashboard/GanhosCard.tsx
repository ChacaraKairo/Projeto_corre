import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  TrendingUp,
  Target,
  Plus,
} from 'lucide-react-native';
import { useTema } from '../../../hooks/modo_tema';

import { styles } from '../../../styles/generated/components/telas/Dashboard/GanhosCardStyles';
/**
 * TELA: Dashboard - Componente GanhosCard (Dinâmico Diário/Semanal)
 * Versão Native corrigida contra erros de 'undefined' no toLocaleString.
 */

interface GanhosProps {
  ganhosTotal: number; // Soma dos ganhos do período (dia ou semana)
  metaValor: number; // Valor da meta (meta_diaria ou meta_semanal)
  tipoMeta: 'diaria' | 'semanal'; // Preferência do usuário vinda do banco
  qtdGanhos?: number;
}

export const GanhosCard: React.FC<GanhosProps> = ({
  ganhosTotal = 0, // Valor padrão para evitar erro de undefined
  metaValor = 0, // Valor padrão
  tipoMeta = 'diaria', // Valor padrão
  qtdGanhos = 0,
}) => {
  const router = useRouter();

  // Garantia de que trabalhamos com números válidos
  const safeGanhos = ganhosTotal || 0;
  const safeMeta = metaValor || 0;

  // Cálculos dinâmicos
  const metaRestante = safeMeta - safeGanhos;
  const porcentagem =
    safeMeta > 0
      ? Math.min((safeGanhos / safeMeta) * 100, 100)
      : 0;

  // Textos dinâmicos baseados no tipo de meta
  const labelPeriodo =
    tipoMeta === 'diaria' ? 'HOJE' : 'DA SEMANA';
  const labelFaltante =
    tipoMeta === 'diaria'
      ? 'P/ META DIÁRIA'
      : 'P/ META SEMANAL';

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <TouchableOpacity
      style={[
        styles.cardGanhos,
        {
          backgroundColor: isDark ? '#161616' : '#FFFFFF',
          borderColor: isDark ? '#222' : '#E0E0E0',
        },
      ]}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/finance',
          params: { initialType: 'ganho' },
        } as any)
      }
    >
      <View style={styles.rowBetween}>
        <View style={styles.iconRow}>
          <View style={styles.iconeGanhoBg}>
            <TrendingUp size={28} color="#00C853" />
          </View>

          <View style={styles.btnPlusSmall}>
            <Plus size={20} color="#0A0A0A" />
          </View>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.metaLabelRow}>
            <Target
              size={12}
              color={metaRestante <= 0 ? '#00C853' : '#666'}
            />
            <Text
              style={[
                styles.labelMeta,
                { color: isDark ? '#666' : '#888' },
              ]}
            >
              {metaRestante <= 0
                ? 'META BATIDA!'
                : `FALTAM ${labelFaltante}`}
            </Text>
          </View>

          <Text
            style={[
              styles.valorMetaRestante,
              { color: isDark ? '#FFF' : '#000' },
              metaRestante <= 0 && { color: '#00C853' },
            ]}
          >
            {metaRestante <= 0
              ? '🔥 SÓ LUCRO'
              : `R$ ${Math.abs(metaRestante).toFixed(2)}`}
          </Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text
          style={[
            styles.labelGanhosHoje,
            { color: isDark ? '#666' : '#888' },
          ]}
        >
          GANHOS {labelPeriodo}{' '}
          {qtdGanhos > 0 ? `• ${qtdGanhos} REGISTOS` : ''}
        </Text>
        <Text
          style={[
            styles.valorGanhosBig,
            { color: isDark ? '#FFF' : '#000' },
          ]}
        >
          R${' '}
          {safeGanhos.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      <View
        style={[
          styles.barraProgressoBg,
          { backgroundColor: isDark ? '#222' : '#E0E0E0' },
        ]}
      >
        <View
          style={[
            styles.barraProgressoFill,
            {
              width: `${porcentagem}%`,
              backgroundColor:
                porcentagem >= 100 ? '#00C853' : '#00E676',
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.porcentagemTexto,
          { color: isDark ? '#444' : '#888' },
        ]}
      >
        {porcentagem.toFixed(0)}% da meta
      </Text>
    </TouchableOpacity>
  );
};


