// Arquivo: src/components/telas/Login/HeaderLogin.tsx
// Componente: HeaderLogin

import { Lock } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Text, View } from 'react-native';
import { styles } from '../../../styles/telas/login/components/HeaderLoginStyles';

interface HeaderLoginProps {
  bounceAnim: Animated.Value;
}

export const HeaderLogin: React.FC<HeaderLoginProps> = ({
  bounceAnim,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ translateY: bounceAnim }] },
        ]}
      >
        <Lock
          size={48}
          {...({ color: '#0A0A0A' } as any)}
          strokeWidth={2.5}
        />
      </Animated.View>
      <Text style={styles.titulo}>KORRE</Text>
      <Text style={styles.subtitulo}>
        {t('login.subtitulo')}
      </Text>
    </View>
  );
};
