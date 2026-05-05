import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTema } from '../../../hooks/modo_tema';

import { styles } from '../../../styles/generated/components/telas/Dashboard/ModalUpdateKmStyles';
interface ModalUpdateKmProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  km: string;
  setKm: (km: string) => void;
}

export const ModalUpdateKm = ({
  visible,
  onClose,
  onSave,
  km,
  setKm,
}: ModalUpdateKmProps) => {
  const { t } = useTranslation();
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }
        style={styles.overlay}
      >
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderColor: isDark ? '#333' : '#E0E0E0',
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: isDark ? '#FFF' : '#000' },
            ]}
          >
            {t('dashboard.atualizar_km', 'Atualizar KM')}
          </Text>

          <Text
            style={[
              styles.label,
              { color: isDark ? '#888' : '#555' },
            ]}
          >
            {t('dashboard.quilometragem_atual', 'QUILOMETRAGEM ATUAL')}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark
                  ? '#0A0A0A'
                  : '#F5F5F5',
                color: isDark ? '#FFF' : '#000',
              },
            ]}
            placeholder={t('dashboard.modal_km_placeholder')}
            placeholderTextColor="#666"
            value={km}
            onChangeText={setKm}
            keyboardType="numeric"
            autoFocus
          />

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.btnCancel,
                {
                  backgroundColor: isDark
                    ? '#222'
                    : '#F5F5F5',
                },
              ]}
            >
              <Text
                style={[
                  styles.btnCancelText,
                  { color: isDark ? '#FFF' : '#000' },
                ]}
              >
                {t('common.cancelar')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              style={[
                styles.btnSave,
                { opacity: km.trim() ? 1 : 0.5 },
              ]}
              disabled={!km.trim()}
            >
              <Text style={styles.btnSaveText}>{t('common.salvar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};


