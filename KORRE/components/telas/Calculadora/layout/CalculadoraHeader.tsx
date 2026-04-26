import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bike,
  Car,
  CheckCircle2,
  Motorbike,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';
import { palette } from '../../../../styles/tokens';
import { calculadoraHeaderStyles as styles } from '../../../../styles/telas/Calculadora/layout/calculadoraHeaderStyles';

const getIconeVeiculo = (
  tipo: string | undefined,
  isActive: boolean,
  colorActive: string,
  colorMuted: string,
) => {
  const size = 16;
  const color = isActive ? colorActive : colorMuted;

  switch (tipo) {
    case 'moto':
      return <Motorbike size={size} color={color} />;
    case 'bicicleta':
      return <Bike size={size} color={color} />;
    case 'caminhao':
    case 'van':
      return <Truck size={size} color={color} />;
    case 'carro_eletrico':
      return <Zap size={size} color={color} />;
    case 'carro':
    default:
      return <Car size={size} color={color} />;
  }
};

interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  ativo: number;
  tipo:
    | 'moto'
    | 'carro'
    | 'caminhao'
    | 'van'
    | 'bicicleta'
    | 'carro_eletrico';
}

interface CalculadoraHeaderProps {
  veiculoAtivo: Veiculo | null;
  veiculosDisponiveis: Veiculo[];
  onMudarVeiculo: (veiculo: Veiculo) => void;
  percentualCompletude: number;
}

export const CalculadoraHeader: React.FC<
  CalculadoraHeaderProps
> = ({
  veiculoAtivo,
  veiculosDisponiveis,
  onMudarVeiculo,
  percentualCompletude,
}) => {
  const router = useRouter();
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const textColor = isDark ? palette.white : palette.surface750;
  const textMuted = isDark ? palette.surface300 : palette.surface400;
  const bgColor = isDark ? palette.black : palette.white;
  const inactiveBorderColor = isDark
    ? palette.surface600
    : palette.surface200;
  const progressBgColor = isDark
    ? palette.surface650
    : palette.surface200;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={textColor} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.title, { color: textColor }]}>
            Auditoria Financeira
          </Text>
          <Text style={[styles.subtitle, { color: textMuted }]}>
            Refine seus indices de lucro
          </Text>
        </View>
      </View>

      <View style={styles.selectorContainer}>
        <Text style={[styles.label, { color: textMuted }]}>
          Veiculo em analise:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {veiculosDisponiveis.map((v) => {
            const isActive = veiculoAtivo?.id === v.id;

            return (
              <TouchableOpacity
                key={v.id}
                onPress={() => onMudarVeiculo(v)}
                style={[
                  styles.veiculoChip,
                  isActive && styles.veiculoChipActive,
                  !isActive && {
                    borderColor: inactiveBorderColor,
                    backgroundColor: 'transparent',
                  },
                ]}
              >
                {getIconeVeiculo(
                  v.tipo,
                  isActive,
                  palette.brand,
                  textMuted,
                )}

                <Text
                  style={[
                    styles.veiculoText,
                    {
                      color: isActive ? palette.brand : textColor,
                    },
                  ]}
                >
                  {v.modelo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <View style={styles.row}>
            <Sparkles size={16} color={palette.brand} />
            <Text
              style={[
                styles.progressLabel,
                { color: textColor },
              ]}
            >
              Precisao dos Dados:{' '}
              {percentualCompletude.toFixed(0)}%
            </Text>
          </View>
          {percentualCompletude === 100 && (
            <CheckCircle2 size={16} color={palette.brand} />
          )}
        </View>

        <View
          style={[
            styles.progressBg,
            { backgroundColor: progressBgColor },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { width: `${percentualCompletude}%` },
            ]}
          />
        </View>
        <Text style={[styles.helperText, { color: textMuted }]}>
          {percentualCompletude < 100
            ? 'Preencha mais campos para um semaforo ultra-preciso.'
            : 'Excelente! Seus indices agora sao 100% confiaveis.'}
        </Text>
      </View>
    </View>
  );
};

