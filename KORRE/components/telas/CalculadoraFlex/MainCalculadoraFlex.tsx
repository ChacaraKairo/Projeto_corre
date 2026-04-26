import {
  FontAwesome5,
  Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTema } from '../../../hooks/modo_tema';

import { styles } from '../../../styles/generated/components/telas/CalculadoraFlex/MainCalculadoraFlexStyles';
import { inlineStyles } from '../../../styles/generated-inline/components/telas/CalculadoraFlex/MainCalculadoraFlexInlineStyles';
export default function MainCalculadoraFlex() {
  const [precoEtanol, setPrecoEtanol] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');

  const calcularVantagem = () => {
    const alc = parseFloat(precoEtanol.replace(',', '.'));
    const gas = parseFloat(precoGasolina.replace(',', '.'));

    if (!alc || !gas || isNaN(alc) || isNaN(gas))
      return null;

    const paridade = (alc / gas) * 100;
    const compensaEtanol = paridade <= 75;

    return {
      compensaEtanol,
      paridade: paridade.toFixed(1),
      limiteEtanol: (gas * 0.75).toFixed(2),
    };
  };

  const resultado = calcularVantagem();

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <KeyboardAvoidingView
      style={inlineStyles.inline1}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* INPUTS */}
        <View style={styles.inputsSection}>
          {/* Etanol */}
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.inputLabel,
                { color: '#00C853' },
              ]}
            >
              Preço do Etanol (Litro)
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: isDark
                    ? '#161616'
                    : '#FFFFFF',
                  borderColor: isDark ? '#222' : '#E0E0E0',
                },
              ]}
            >
              <Text
                style={[
                  styles.inputPrefix,
                  { color: '#00C853' },
                ]}
              >
                R$
              </Text>
              <TextInput
                style={[styles.input, { color: '#00C853' }]}
                placeholder="0.00"
                placeholderTextColor="rgba(0,200,83,0.2)"
                keyboardType="decimal-pad"
                value={precoEtanol}
                onChangeText={setPrecoEtanol}
                selectionColor="#00C853"
              />
            </View>
          </View>

          {/* Gasolina */}
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.inputLabel,
                { color: '#EAB308' },
              ]}
            >
              Preço da Gasolina (Litro)
            </Text>
            <View
              style={[
                styles.inputWrapper,
                styles.inputWrapperGas,
                {
                  backgroundColor: isDark
                    ? '#161616'
                    : '#FFFFFF',
                  borderColor: isDark ? '#222' : '#E0E0E0',
                },
              ]}
            >
              <Text
                style={[
                  styles.inputPrefix,
                  { color: '#EAB308' },
                ]}
              >
                R$
              </Text>
              <TextInput
                style={[styles.input, { color: '#EAB308' }]}
                placeholder="0.00"
                placeholderTextColor="rgba(234,179,8,0.2)"
                keyboardType="decimal-pad"
                value={precoGasolina}
                onChangeText={setPrecoGasolina}
                selectionColor="#EAB308"
              />
            </View>
          </View>
        </View>

        {/* RESULTADO */}
        {resultado ? (
          <View
            style={[
              styles.resultCard,
              resultado.compensaEtanol
                ? styles.resultCardEtanol
                : styles.resultCardGas,
            ]}
          >
            <Text style={styles.resultLabel}>
              Ponto de Equilíbrio:
            </Text>
            <Text
              style={[
                styles.resultTitle,
                {
                  color: resultado.compensaEtanol
                    ? '#00C853'
                    : '#EAB308',
                },
              ]}
            >
              {resultado.compensaEtanol
                ? 'Etanol'
                : 'Gasolina'}
            </Text>

            <View style={styles.resultDivider} />

            <View style={styles.resultStats}>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatLabel}>
                  Rendimento
                </Text>
                <Text
                  style={[
                    styles.resultStatValue,
                    {
                      color: resultado.compensaEtanol
                        ? '#00C853'
                        : '#EAB308',
                    },
                  ]}
                >
                  {resultado.paridade}%
                </Text>
              </View>
              <View style={styles.resultVerticalDivider} />
              <View style={styles.resultStat}>
                <Text
                  style={[
                    styles.resultStatLabel,
                    { color: isDark ? '#888' : '#555' },
                  ]}
                >
                  Limite Etanol
                </Text>
                <Text
                  style={[
                    styles.resultStatValue,
                    { color: isDark ? '#fff' : '#000' },
                  ]}
                >
                  R$ {resultado.limiteEtanol}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: isDark
                  ? '#0A0A0A'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
              },
            ]}
          >
            <FontAwesome5
              name="gas-pump"
              size={40}
              color={isDark ? '#1A1A1A' : '#E0E0E0'}
            />
            <Text
              style={[
                styles.emptyText,
                { color: isDark ? '#333' : '#888' },
              ]}
            >
              Insira os preços{'\n'}para o diagnóstico
            </Text>
          </View>
        )}

        {/* INFO BOX */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: isDark ? '#111' : '#FFFFFF',
              borderColor: isDark ? '#161616' : '#E0E0E0',
            },
          ]}
        >
          <View style={styles.infoIconWrap}>
            <Ionicons
              name="information-circle"
              size={22}
              color="#00C853"
            />
          </View>
          <View style={inlineStyles.inline2}>
            <Text
              style={[
                styles.infoTitle,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              Cálculo Atualizado
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isDark ? '#666' : '#555' },
              ]}
            >
              O ponto de viragem agora é de{' '}
              <Text style={styles.infoHighlight}>75%</Text>.
              Se o álcool custar menos de 75% da gasolina,
              ele é financeiramente superior para motores
              modernos e para a nova mistura E30.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


