import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TrendingDown, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTema } from '../../../hooks/modo_tema';

import { styles } from '../../../styles/generated/components/telas/Dashboard/GastosCardStyles';
interface GastosProps {
  valor: number;
  qtdGastos?: number;
}

export const GastosCard: React.FC<GastosProps> = ({
  valor,
  qtdGastos = 0,
}) => {
  const router = useRouter();

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#161616' : '#FFFFFF',
          borderColor: isDark ? '#222' : '#E0E0E0',
        },
      ]}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/finance',
          params: { initialType: 'despesa' },
        } as any)
      }
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {/* Fundo do ícone de gasto */}
          <View style={styles.iconBg}>
            <TrendingDown size={28} color="#F44336" />
          </View>

          {/* Botão de Plus estilizado para Gastos */}
          <View style={styles.plusBtn}>
            <Plus size={20} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            { color: isDark ? '#666' : '#888' },
          ]}
        >
          GASTOS DE HOJE{' '}
          {qtdGastos > 0 ? `• ${qtdGastos} REGISTOS` : ''}
        </Text>
        <Text
          style={[
            styles.value,
            { color: isDark ? '#FFF' : '#000' },
          ]}
        >
          R${' '}
          {valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


