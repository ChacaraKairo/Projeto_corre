// Arquivo: src/components/telas/Cadastro/VeiculoSecao.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Settings,
  Bike,
  Car,
  Gauge,
  Truck,
  Bus,
} from 'lucide-react-native';
import { Input } from '../../ui/inputs/Input';
import { styles } from '../../../styles/Cadastro/componentes/cadastroStyles';

interface VeiculoProps {
  tipo: 'moto' | 'carro' | 'caminhao' | 'van';
  setTipo: (
    t: 'moto' | 'carro' | 'caminhao' | 'van',
  ) => void;
  marca: string;
  setMarca: (t: string) => void;
  modelo: string;
  setModelo: (t: string) => void;
  ano: string;
  setAno: (t: string) => void;
  motor: string;
  setMotor: (t: string) => void;
  placa: string;
  setPlaca: (t: string) => void;
  km: string;
  setKm: (t: string) => void;
  erro: boolean;
}

export const VeiculoSecao: React.FC<VeiculoProps> = ({
  tipo,
  setTipo,
  marca,
  setMarca,
  modelo,
  setModelo,
  ano,
  setAno,
  motor,
  setMotor,
  placa,
  setPlaca,
  km,
  setKm,
  erro,
}) => {
  // Mapeamento de placeholders baseados no tipo selecionado
  const getPlaceholders = () => {
    switch (tipo) {
      case 'moto':
        return {
          marca: 'Ex: Honda',
          modelo: 'Ex: CG Titan',
          motor: 'Ex: 160cc',
        };
      case 'carro':
        return {
          marca: 'Ex: Fiat',
          modelo: 'Ex: Toro',
          motor: 'Ex: 2.0',
        };
      case 'caminhao':
        return {
          marca: 'Ex: Volvo',
          modelo: 'Ex: FH 540',
          motor: 'Ex: 13L',
        };
      case 'van':
        return {
          marca: 'Ex: Mercedes',
          modelo: 'Ex: Sprinter',
          motor: 'Ex: 2.2',
        };
      default:
        return {
          marca: 'Marca',
          modelo: 'Modelo',
          motor: 'Motor',
        };
    }
  };

  const placeholders = getPlaceholders();

  return (
    <View style={styles.card}>
      <View style={localStyles.sectionTitleRow}>
        <Settings size={18} color="#00C853" />
        <Text style={styles.labelSecao}>TUA MÁQUINA</Text>
      </View>

      {/* SELETOR DE TIPO EM GRID 2x2 */}
      <View style={localStyles.selectorGrid}>
        <View style={localStyles.selectorRow}>
          <TouchableOpacity
            style={[
              localStyles.selectBtn,
              tipo === 'moto' && localStyles.selectBtnAtivo,
            ]}
            onPress={() => setTipo('moto')}
          >
            <Bike
              size={24}
              color={tipo === 'moto' ? '#00C853' : '#444'}
            />
            <Text
              style={[
                localStyles.selectLabel,
                tipo === 'moto' &&
                  localStyles.selectLabelAtivo,
              ]}
            >
              MOTO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              localStyles.selectBtn,
              tipo === 'carro' &&
                localStyles.selectBtnAtivo,
            ]}
            onPress={() => setTipo('carro')}
          >
            <Car
              size={24}
              color={tipo === 'carro' ? '#00C853' : '#444'}
            />
            <Text
              style={[
                localStyles.selectLabel,
                tipo === 'carro' &&
                  localStyles.selectLabelAtivo,
              ]}
            >
              CARRO
            </Text>
          </TouchableOpacity>
        </View>

        <View style={localStyles.selectorRow}>
          <TouchableOpacity
            style={[
              localStyles.selectBtn,
              tipo === 'caminhao' &&
                localStyles.selectBtnAtivo,
            ]}
            onPress={() => setTipo('caminhao')}
          >
            <Truck
              size={24}
              color={
                tipo === 'caminhao' ? '#00C853' : '#444'
              }
            />
            <Text
              style={[
                localStyles.selectLabel,
                tipo === 'caminhao' &&
                  localStyles.selectLabelAtivo,
              ]}
            >
              CAMINHÃO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              localStyles.selectBtn,
              tipo === 'van' && localStyles.selectBtnAtivo,
            ]}
            onPress={() => setTipo('van')}
          >
            <Bus
              size={24}
              color={tipo === 'van' ? '#00C853' : '#444'}
            />
            <Text
              style={[
                localStyles.selectLabel,
                tipo === 'van' &&
                  localStyles.selectLabelAtivo,
              ]}
            >
              VAN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* INPUTS COM EXEMPLOS DINÂMICOS */}
      <View style={localStyles.row}>
        <View style={localStyles.flex1}>
          <Input
            label="Marca"
            placeholder={placeholders.marca}
            value={marca}
            onChangeText={setMarca}
            erro={erro && !marca}
          />
        </View>
        <View style={localStyles.flex1}>
          <Input
            label="Modelo"
            placeholder={placeholders.modelo}
            value={modelo}
            onChangeText={setModelo}
            erro={erro && !modelo}
          />
        </View>
      </View>

      <View style={localStyles.row}>
        <View style={localStyles.flex1}>
          <Input
            label="Ano"
            placeholder="2024"
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
          />
        </View>
        <View style={localStyles.flex1}>
          <Input
            label="Motor"
            placeholder={placeholders.motor}
            value={motor}
            onChangeText={setMotor}
          />
        </View>
      </View>

      <Input
        label="Placa"
        placeholder="ABC1D23"
        value={placa}
        onChangeText={(t) => setPlaca(t.toUpperCase())}
        autoCapitalize="characters"
        erro={erro && !placa}
      />

      <Input
        label="Quilometragem Atual"
        placeholder="Ex: 12500"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
        Icone={Gauge}
        erro={erro && !km}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  selectorGrid: {
    gap: 12,
    marginBottom: 20,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  selectBtn: {
    flex: 1,
    height: 70, // Reduzido um pouco para caber os 4 botões na tela
    backgroundColor: '#202020',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnAtivo: {
    borderColor: '#00C853',
    backgroundColor: 'rgba(0, 200, 83, 0.05)',
  },
  selectLabel: {
    fontSize: 9, // Ajustado para não quebrar texto longo
    fontWeight: '900',
    color: '#444',
    marginTop: 6,
    textTransform: 'uppercase',
  },
  selectLabelAtivo: {
    color: '#00C853',
  },
});
