// src/components/telas/Configuracoes/ModalIdioma.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { inlineStyles } from '../../../styles/generated-inline/components/telas/Configuracoes/ModalIdiomaInlineStyles';
import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/Configuracoes/ModalIdiomaDynamicStyles';
interface Props {
  visible: boolean;
  onClose: () => void;
  idiomas: { code: string; label: string }[];
  isDark: boolean;
  cardColor: string;
  borderColor: string;
}

export const ModalIdioma = ({
  visible,
  onClose,
  idiomas,
  isDark,
  cardColor,
  borderColor,
}: Props) => {
  const { i18n } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={inlineStyles.inline1}
      >
        <View
          style={dynamicInlineStyles.inline1({ cardColor, borderColor })}
        >
          <Text
            style={dynamicInlineStyles.inline2({ isDark })}
          >
            Selecione o Idioma (Futuro)
          </Text>
          {idiomas.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={dynamicInlineStyles.inline3({ borderColor })}
              onPress={() => {
                i18n.changeLanguage(lang.code);
                onClose();
              }}
            >
              <Text
                style={dynamicInlineStyles.inline4({ i18n, lang, isDark })}
              >
                {lang.label}
              </Text>
              {i18n.language === lang.code && (
                <Check size={20} color="#00C853" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={inlineStyles.inline2}
            onPress={onClose}
          >
            <Text
              style={inlineStyles.inline3}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
