// components/telas/Dashboard/StatusMola.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { useEficiencia } from '../../../hooks/dashboard/useEficiencia';

import { styles } from '../../../styles/generated/components/telas/Dashboard/StatusMolaStyles';
interface StatusMolaProps {
  ganhos: number;
  gastos: number;
  meta: number;
}

export const StatusMola: React.FC<StatusMolaProps> = ({
  ganhos,
  gastos,
  meta,
}) => {
  const {
    lucroReal,
    progressoMeta,
    percentualTexto,
    status,
  } = useEficiencia(ganhos, gastos, 0, meta);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Progresso da Meta</Text>
        <Text style={styles.value}>{percentualTexto}</Text>
      </View>

      {/* Barra de Progresso (Molecule) */}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressoMeta * 100}%` },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.subLabel}>
          Lucro Real do Dia:
        </Text>
        <Text
          style={[
            styles.lucroValue,
            {
              color:
                status === 'lucro' ? '#10B981' : '#EF4444',
            },
          ]}
        >
          R$ {lucroReal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};


