import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Bike,
  Motorbike,
  Car,
  Bus,
  Gauge,
  ArrowLeftRight,
} from 'lucide-react-native';
import { styles } from '../../../styles/telas/Oficina/oficinaStyles';
import { useTema } from '../../../hooks/modo_tema';

import { inlineStyles } from '../../../styles/generated-inline/components/telas/Oficina/CardVeiculoOficinaInlineStyles';
import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/Oficina/CardVeiculoOficinaDynamicStyles';
interface Props {
  veiculo: any;
  statusResumo: { texto: string; cor: string; bg: string };
  onOpenSelector: () => void;
}

export const CardVeiculoOficina = ({
  veiculo,
  statusResumo,
  onOpenSelector,
}: Props) => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <View
      style={[
        styles.cardVeiculo,
        {
          backgroundColor: isDark ? '#161616' : '#FFFFFF',
          borderColor: isDark ? '#222' : '#E0E0E0',
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.veiculoHeader}>
        <View
          style={inlineStyles.inline1}
        >
          <View
            style={dynamicInlineStyles.inline1({ isDark })}
          >
            {(!veiculo?.tipo ||
              veiculo?.tipo === 'moto') && (
              <Motorbike size={24} color="#00C853" />
            )}
            {veiculo?.tipo === 'bicicleta' && (
              <Bike size={24} color="#00C853" />
            )}
            {veiculo?.tipo === 'carro' && (
              <Car size={24} color="#00C853" />
            )}
            {veiculo?.tipo === 'van' && (
              <Bus size={24} color="#00C853" />
            )}
          </View>
          <View style={inlineStyles.inline2}>
            <Text
              style={[
                styles.labelAviso,
                { color: isDark ? '#888' : '#555' },
              ]}
            >
              A visualizar:
            </Text>
            <Text
              style={[
                styles.veiculoModelo,
                { color: isDark ? '#FFF' : '#000' },
              ]}
            >
              {veiculo?.modelo || 'Sem Veículo'}
            </Text>
            <Text
              style={[
                styles.veiculoPlaca,
                { color: isDark ? '#888' : '#555' },
              ]}
            >
              {veiculo?.placa || '---'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            {
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isDark ? '#333' : '#E0E0E0',
            },
            {
              backgroundColor: isDark
                ? '#0A0A0A'
                : '#F5F5F5',
            },
          ]}
          onPress={onOpenSelector}
        >
          <ArrowLeftRight size={20} color="#00C853" />
        </TouchableOpacity>
      </View>

      <View style={styles.veiculoStats}>
        <View style={inlineStyles.inline3}>
          <View
            style={inlineStyles.inline4}
          >
            <Gauge size={12} color="#444" />
            <Text
              style={inlineStyles.inline5}
            >
              KM Atual
            </Text>
          </View>
          <Text
            style={dynamicInlineStyles.inline2({ isDark })}
          >
            {veiculo?.km_atual?.toLocaleString() || '0'} km
          </Text>
        </View>

        <View
          style={inlineStyles.inline6}
        >
          <View
            style={dynamicInlineStyles.inline3({ statusResumo })}
          >
            <Text
              style={dynamicInlineStyles.inline4({ statusResumo })}
            >
              {statusResumo.texto}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
