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
import {
  normalizeLanguage,
  setAppLanguage,
  SupportedLanguage,
} from '../../../locales/i18n';

import { inlineStyles } from '../../../styles/generated-inline/components/telas/Configuracoes/ModalIdiomaInlineStyles';
import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/Configuracoes/ModalIdiomaDynamicStyles';
interface Props {
  visible: boolean;
  onClose: () => void;
  idiomas: readonly {
    code: SupportedLanguage;
    label: string;
  }[];
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
  const { i18n, t } = useTranslation();
  const activeLanguage = normalizeLanguage(i18n.language);

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
            {t('configuracoes.selecione_idioma')}
          </Text>
          {idiomas.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={dynamicInlineStyles.inline3({ borderColor })}
              onPress={async () => {
                await setAppLanguage(lang.code);
                onClose();
              }}
            >
              <Text
                style={dynamicInlineStyles.inline4({
                  isActive: activeLanguage === lang.code,
                  isDark,
                })}
              >
                {lang.label}
              </Text>
              {activeLanguage === lang.code && (
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
              {t('configuracoes.cancelar')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
