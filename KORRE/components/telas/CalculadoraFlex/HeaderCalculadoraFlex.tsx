import {
  Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppRoutes } from '../../../constants/routes';
import { useTema } from '../../../hooks/modo_tema';
import { safeBack } from '../../../utils/navigation/safeBack';

import { styles } from '../../../styles/generated/components/telas/CalculadoraFlex/HeaderCalculadoraFlexStyles';
export default function HeaderCalculadoraFlex({
  setModalAjuda,
  origem,
}: {
  setModalAjuda: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  origem?: string;
}) {
  const router = useRouter();

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const handleBack = () => {
    safeBack(
      router,
      origem === 'login' ? AppRoutes.login : AppRoutes.dashboard,
    );
  };

  return (
    <View
      style={[
        styles.header,
        {
          borderBottomColor: isDark ? '#161616' : '#E0E0E0',
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.headerBtn,
          {
            backgroundColor: isDark ? '#161616' : '#FFFFFF',
            borderColor: isDark ? '#222' : '#E0E0E0',
          },
        ]}
        activeOpacity={0.8}
        onPress={handleBack}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color={isDark ? '#666' : '#333'}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        Calculadora Flex
      </Text>
      <TouchableOpacity
        style={styles.headerHelpBtn}
        onPress={() => setModalAjuda(true)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="help-circle"
          size={20}
          color="#00C853"
        />
      </TouchableOpacity>
    </View>
  );
}


