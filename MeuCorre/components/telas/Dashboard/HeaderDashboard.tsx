import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Zap, Settings, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { dashboardStyles as styles } from '../../../styles/telas/Dashboard/dashboardStyles';

interface HeaderProps {
  nome: string;
  fraseMotivacional: string;
  fotoPerfil?: string | null;
  onPressConfig?: () => void; // Nova prop para funcionalidade do botão
}

export const HeaderDashboard: React.FC<HeaderProps> = ({
  nome,
  fraseMotivacional,
  fotoPerfil,
  onPressConfig,
}) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.perfilContainer}>
        <TouchableOpacity
          style={styles.infoUsuario}
          activeOpacity={0.7}
          onPress={() => router.push('/perfil' as any)}
        >
          {/* Avatar com suporte a foto local ou fallback */}
          <View style={styles.avatar}>
            {fotoPerfil ? (
              <Image
                source={{ uri: fotoPerfil }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={24} color="#00C853" />
              </View>
            )}
          </View>

          <View>
            {/* Nome com peso 900 conforme a nova identidade */}
            <Text style={styles.nomeUsuario}>
              {nome.split(' ')[0]}
            </Text>
            <View style={styles.tagMotivacional}>
              <Zap
                size={10}
                color="#00C853"
                fill="#00C853"
              />
              {/* Esta frase agora virá do frasesService via Dashboard.tsx */}
              <Text style={styles.textoMotivacional}>
                {fraseMotivacional}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnConfig}
          activeOpacity={0.7}
          onPress={onPressConfig}
        >
          <Settings size={20} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
