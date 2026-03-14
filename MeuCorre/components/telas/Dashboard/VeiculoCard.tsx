import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Bike,
  Car,
  Motorbike,
  Bus,
  ArrowLeftRight,
  ClipboardList,
} from 'lucide-react-native';
import { dashboardStyles as styles } from '../../../styles/telas/Dashboard/dashboardStyles';

interface VeiculoProps {
  veiculo: {
    tipo: 'moto' | 'carro' | 'bicicleta' | 'van';
    modelo: string;
    placa: string;
  } | null;
  rendimento: string;
  onTrocar: () => void;
  onOficina: () => void;
}

export const VeiculoCard: React.FC<VeiculoProps> = ({
  veiculo,
  rendimento,
  onTrocar,
  onOficina,
}) => {
  return (
    <View style={styles.cardPreto}>
      <View style={styles.veiculoHeader}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View style={styles.veiculoIconeBadge}>
            {/* Lógica de Ícones Dinâmica */}
            {(!veiculo || veiculo.tipo === 'moto') && (
              <Motorbike size={32} color="#0A0A0A" />
            )}
            {veiculo?.tipo === 'bicicleta' && (
              <Bike size={32} color="#0A0A0A" />
            )}
            {veiculo?.tipo === 'carro' && (
              <Car size={32} color="#0A0A0A" />
            )}
            {veiculo?.tipo === 'van' && (
              <Bus size={32} color="#0A0A0A" />
            )}
          </View>
          <View>
            <Text style={styles.veiculoTextoPrimario}>
              {veiculo?.modelo || 'Sem Veículo'}
            </Text>
            <Text style={styles.veiculoTextoSecundario}>
              {veiculo?.placa || '---'}
            </Text>
          </View>
        </View>

        <View style={styles.eficienciaContainer}>
          <Text style={styles.eficienciaLabel}>
            EFICIÊNCIA
          </Text>
          <Text style={styles.eficienciaValor}>
            R$ {rendimento}/km
          </Text>
        </View>
      </View>

      <View style={styles.acoesVeiculoRow}>
        <TouchableOpacity
          style={styles.btnAcaoVeiculo}
          onPress={onTrocar}
        >
          <ArrowLeftRight size={18} color="#00C853" />
          <Text style={styles.btnAcaoVeiculoTexto}>
            Trocar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnAcaoVeiculo}
          onPress={onOficina}
        >
          <ClipboardList size={18} color="#00C853" />
          <Text style={styles.btnAcaoVeiculoTexto}>
            Oficina
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
