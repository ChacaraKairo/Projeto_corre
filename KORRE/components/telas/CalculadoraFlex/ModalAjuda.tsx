import {
  Ionicons,
  MaterialCommunityIcons,
  } from '@expo/vector-icons';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from '../../../hooks/modo_tema';

import { styles } from '../../../styles/generated/components/telas/CalculadoraFlex/ModalAjudaStyles';
import { inlineStyles } from '../../../styles/generated-inline/components/telas/CalculadoraFlex/ModalAjudaInlineStyles';
export default function ModalAjuda({
  modalAjuda,
  setModalAjuda,
}: {
  modalAjuda: boolean;
  setModalAjuda: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <Modal
      visible={modalAjuda}
      animationType="fade"
      transparent
      onRequestClose={() => setModalAjuda(false)}
    >
      <View
        style={[
          styles.modalOverlay,
          {
            backgroundColor: isDark
              ? 'rgba(0,0,0,0.97)'
              : 'rgba(255,255,255,0.95)',
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={[
              styles.modalCloseBtn,
              {
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
              },
            ]}
            onPress={() => setModalAjuda(false)}
            activeOpacity={0.8}
          >
            <Ionicons
              name="close"
              size={24}
              color={isDark ? '#666' : '#333'}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalIconWrap}>
              <Ionicons
                name="calculator"
                size={40}
                color="#00C853"
              />
            </View>
            <Text
              style={[
                styles.modalTitle,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              Entenda a Matemática
            </Text>
            <Text style={styles.modalSubtitle}>
              Por que os 70% ficaram para trás?
            </Text>
          </View>

          {/* Tópico 1 */}
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
              },
            ]}
          >
            <View style={styles.modalCardHeader}>
              <MaterialCommunityIcons
                name="flask"
                size={20}
                color="#EAB308"
              />
              <Text
                style={[
                  styles.modalCardTitle,
                  { color: '#EAB308' },
                ]}
              >
                A Nova Gasolina (E30)
              </Text>
            </View>
            <Text
              style={[
                styles.modalCardText,
                { color: isDark ? '#888' : '#555' },
              ]}
            >
              Desde agosto de 2025, a gasolina comum no
              Brasil passou a ter{' '}
              <Text
                style={[
                  styles.highlight,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                30% de etanol anidro
              </Text>{' '}
              (antes era 27%). Isso significa que a gasolina
              ficou menos pura e rende menos quilómetros
              por litro, o que aproxima o custo-benefício
              dos dois combustíveis.
            </Text>
          </View>

          {/* Tópico 2 */}
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
              },
            ]}
          >
            <View style={styles.modalCardHeader}>
              <Ionicons
                name="flash"
                size={20}
                color="#00C853"
              />
              <Text
                style={[
                  styles.modalCardTitle,
                  { color: '#00C853' },
                ]}
              >
                Motores Inteligentes
              </Text>
            </View>
            <Text
              style={[
                styles.modalCardText,
                { color: isDark ? '#888' : '#555' },
              ]}
            >
              Os carros flex fabricados nos últimos anos
              possuem sistemas de injeção e taxas de
              compressão muito mais eficientes com o
              combustível vegetal. O etanol agora rende mais
              do que rendia antigamente em relação à
              gasolina.
            </Text>
          </View>

          {/* Tópico 3 */}
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
              },
            ]}
          >
            <View style={styles.modalCardHeader}>
              <Ionicons
                name="speedometer"
                size={20}
                color="#3B82F6"
              />
              <Text
                style={[
                  styles.modalCardTitle,
                  { color: '#3B82F6' },
                ]}
              >
                Seja Preciso
              </Text>
            </View>
            <Text
              style={[
                styles.modalCardText,
                {
                  marginBottom: 12,
                  color: isDark ? '#888' : '#555',
                },
              ]}
            >
              A regra dos 75% é uma média nacional segura.
              Mas queres ser exato? Faz o seguinte:
            </Text>
            <View
              style={[
                styles.stepsBox,
                {
                  backgroundColor: isDark
                    ? '#0A0A0A'
                    : '#F5F5F5',
                  borderColor: isDark ? '#222' : '#E0E0E0',
                },
              ]}
            >
              <Text
                style={[
                  styles.stepText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                1. Vê quanto o teu veículo faz por litro no
                Etanol (ex: 9km/l)
              </Text>
              <Text
                style={[
                  styles.stepText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                2. Vê quanto faz na Gasolina (ex: 12km/l)
              </Text>
              <Text
                style={[
                  styles.stepText,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                3. Divide um pelo outro:{' '}
                <Text style={inlineStyles.inline1}>
                  9 ÷ 12 = 0,75
                </Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.modalCta}
            onPress={() => setModalAjuda(false)}
            activeOpacity={0.85}
          >
            <Text style={styles.modalCtaText}>
              Tudo certo, vamos rodar!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}


