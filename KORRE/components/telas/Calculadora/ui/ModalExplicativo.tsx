import {
  Info,
  X } from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';

import { styles } from '../../../../styles/generated/components/telas/Calculadora/ui/ModalExplicativoStyles';
interface ModalExplicativoProps {
  visible: boolean;
  onClose: () => void;
  titulo: string;
  textoExplicativo: string;
}

export const ModalExplicativo: React.FC<
  ModalExplicativoProps
> = ({ visible, onClose, titulo, textoExplicativo }) => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const cardColor = isDark ? '#161616' : '#FFFFFF';
  const borderColor = isDark ? '#333' : '#E0E0E0';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const textMuted = isDark ? '#AAA' : '#555';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Info size={20} color="#00C853" />
              <Text
                style={[styles.title, { color: textColor }]}
              >
                {titulo}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeButton,
                {
                  backgroundColor: isDark
                    ? '#222'
                    : '#F5F5F5',
                },
              ]}
            >
              <X size={20} color={textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.body}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[styles.text, { color: textMuted }]}
            >
              {textoExplicativo}
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.btnOk}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.btnOkText}>ENTENDI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


