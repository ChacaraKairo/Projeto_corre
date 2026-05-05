import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {
  Check,
  Briefcase,
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Zap,
  ShoppingBag,
} from 'lucide-react-native';
import { styles } from '../../../styles/telas/OrigemGanhos/OrigemGanhosStyles';

const IconComponents: any = {
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Briefcase,
  Zap,
  ShoppingBag,
};
const iconList = Object.keys(IconComponents);
const colorPalette = [
  '#00C853',
  '#2196F3',
  '#F44336',
  '#FF9800',
  '#9C27B0',
  '#FFEB3B',
  '#E91E63',
  '#00BCD4',
];

interface ModalProps {
  visible: boolean;
  nome: string;
  setNome: (t: string) => void;
  icone: string;
  setIcone: (t: string) => void;
  cor: string;
  setCor: (t: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const ModalNovaOrigem: React.FC<ModalProps> = ({
  visible,
  nome,
  setNome,
  icone,
  setIcone,
  cor,
  setCor,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const PreviewIcon = IconComponents[icone] || Briefcase;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View
            style={[
              styles.previewCircle,
              {
                backgroundColor: `${cor}15`,
                borderColor: cor,
              },
            ]}
          >
            <PreviewIcon size={28} color={cor} />
          </View>
          <Text style={styles.modalTitle}>{t('origem_ganhos.nova_origem')}</Text>

          <View style={styles.modalForm}>
            <Text style={styles.modalLabel}>
              {t('origem_ganhos.nome_app', 'NOME DO APLICATIVO')}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={t('origem_ganhos.placeholder_nome')}
              placeholderTextColor="#333"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.modalLabel}>
              {t('financeiro.escolher_icone', 'ESCOLHER ICONE')}
            </Text>
            <View style={styles.iconGrid}>
              {iconList.map((ico) => {
                const Icon = IconComponents[ico];
                return (
                  <TouchableOpacity
                    key={ico}
                    style={[
                      styles.iconOption,
                      icone === ico &&
                        styles.iconOptionActive,
                    ]}
                    onPress={() => setIcone(ico)}
                  >
                    <Icon
                      size={18}
                      color={
                        icone === ico ? '#FFF' : '#333'
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.modalLabel}>
              {t('origem_ganhos.escolher_cor', 'ESCOLHER COR')}
            </Text>
            <View style={styles.colorGrid}>
              {colorPalette.map((col) => (
                <TouchableOpacity
                  key={col}
                  style={[
                    styles.colorOption,
                    { backgroundColor: col },
                    cor === col && {
                      borderWidth: 2,
                      borderColor: '#FFF',
                    },
                  ]}
                  onPress={() => setCor(col)}
                >
                  {cor === col && (
                    <Check
                      size={14}
                      color="#000"
                      strokeWidth={4}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnSaveModal}
            onPress={onSave}
          >
            <Text style={styles.btnSaveModalText}>
              {t('origem_ganhos.registrar', 'REGISTRAR ORIGEM')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancelModal}
            onPress={onClose}
          >
            <Text style={styles.btnCancelModalText}>
              {t('common.cancelar').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
