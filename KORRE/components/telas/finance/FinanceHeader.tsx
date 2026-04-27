import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { financeStyles as styles } from '../../../styles/telas/Finance/financeStyles';

import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/finance/FinanceHeaderDynamicStyles';
interface FinanceHeaderProps {
  tipo: string;
  mainColor: string;
  onCancel: () => void;
}

export const FinanceHeader = ({
  tipo,
  mainColor,
  onCancel,
}: FinanceHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        Anotar{' '}
        <Text style={dynamicInlineStyles.inline1({ mainColor })}>
          {tipo === 'ganho' ? 'Ganho' : 'Despesa'}
        </Text>
      </Text>
      <TouchableOpacity
        onPress={() => router.replace('/(tabs)/dashboard')}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
