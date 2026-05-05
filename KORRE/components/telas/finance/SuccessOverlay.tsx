import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { Check } from 'lucide-react-native';
import { financeStyles as styles } from '../../../styles/telas/Finance/financeStyles';

interface SuccessOverlayProps {
  mainColor: string;
}

export const SuccessOverlay = ({
  mainColor,
}: SuccessOverlayProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.overlayContainer}>
      <View
        style={[
          styles.successIconBg,
          {
            backgroundColor: mainColor,
            shadowColor: mainColor,
          },
        ]}
      >
        <Check size={48} color="white" strokeWidth={4} />
      </View>
      <Text style={styles.successTitle}>
        {t('financeiro.anotacao_feita')}
      </Text>
      <Text style={styles.successSubtitle}>
        {t('financeiro.atualizando_lucro', 'Atualizando seu lucro...')}
      </Text>
    </View>
  );
};
