import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Gauge,
  Plus,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react-native';
import { dashboardStyles as styles } from '../../../styles/telas/Dashboard/dashboardStyles';

interface StatusProps {
  kmAtual: number;
  statusManutencao: 'critical' | 'warning' | 'ok';
  descManutencao: string;
  onUpdateKm: () => void;
  onOpenOficina: () => void;
}

export const StatusGrid: React.FC<StatusProps> = ({
  kmAtual,
  statusManutencao,
  descManutencao,
  onUpdateKm,
  onOpenOficina,
}) => {
  // Configuração dinâmica baseada no status
  const uiConfig = {
    critical: {
      icon: <AlertTriangle size={20} color="#FFF" />,
      label: 'Crítico',
    },
    warning: {
      icon: <AlertCircle size={20} color="#FFF" />,
      label: 'Atenção',
    },
    ok: {
      icon: <ShieldCheck size={20} color="#FFF" />,
      label: 'Em Dia',
    },
  };

  const UI = uiConfig[statusManutencao];

  return (
    <View style={styles.grid}>
      {/* Card Odómetro */}
      <TouchableOpacity
        style={styles.cardMeio}
        onPress={onUpdateKm}
        activeOpacity={0.8}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: '#202020',
              borderRadius: 12,
            }}
          >
            <Gauge size={20} color="#00C853" />
          </View>
          <View style={styles.btnPlusSmall}>
            <Plus size={20} color="#0A0A0A" />
          </View>
        </View>
        <View>
          <Text style={styles.labelMeta}>KM ATUAL</Text>
          <Text style={styles.valorDestaqueMeio}>
            {kmAtual.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Card Manutenção */}
      <TouchableOpacity
        style={[
          styles.cardMeio,
          styles[`cardStatus_${statusManutencao}`],
        ]}
        onPress={onOpenOficina}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: '#202020',
              borderRadius: 12,
            }}
          >
            {UI.icon}
          </View>
          <ChevronRight size={18} color="#444" />
        </View>
        <View>
          <Text
            style={[
              styles.labelMeta,
              styles[`textStatus_${statusManutencao}`],
            ]}
          >
            {UI.label}
          </Text>
          <Text style={styles.descStatusMeio}>
            {descManutencao}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
