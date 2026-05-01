import { useRouter } from 'expo-router';
import { Check, Fuel } from 'lucide-react-native';
import React from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardLogin } from '../../components/telas/Login/CardLogin';
import { FooterLogin } from '../../components/telas/Login/FooterLogin';
import { useLogin } from '../../hooks/login/useLogin';
import { loginStyles as styles } from '../../styles/telas/login/LoginStyles';
import { AppRoutes } from '../../constants/routes';

import { inlineStyles } from '../../styles/generated-inline/app/(auth)/loginInlineStyles';
import { dynamicInlineStyles } from '../../styles/generated-dynamic/app/(auth)/loginDynamicStyles';
const LoginScreen: React.FC = () => {
  const router = useRouter();

  const {
    identificacao,
    setIdentificacao,
    senha,
    setSenha,
    temUsuario,
    lembrarSenha,
    setLembrarSenha,
    carregando,
    erro,
    biometriaDisponivel,
    bounceAnim,
    realizarLoginManual,
    realizarLoginBiometrico,
    recuperarSenha,
  } = useLogin();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={inlineStyles.inline1}
        onPress={() =>
          router.push({
            pathname: AppRoutes.calculadora,
            params: { origem: 'login' },
          })
        }
        activeOpacity={0.7}
      >
        <Fuel size={24} color="#00C853" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }
        style={inlineStyles.inline2}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={dynamicInlineStyles.inline1({ bounceAnim })}
          >
            <Image
              source={require('../../assets/images/android-icon-foreground.png')}
              style={inlineStyles.inline3}
              resizeMode="contain"
            />
            <Text
              style={inlineStyles.inline4}
            >
              Você nas ruas, nós no seu bolso.
            </Text>
          </Animated.View>

          <CardLogin
            identificacao={identificacao}
            setIdentificacao={setIdentificacao}
            senha={senha}
            setSenha={setSenha}
            erro={erro}
            carregando={carregando}
            biometriaDisponivel={biometriaDisponivel}
            onLogin={realizarLoginManual}
            onBiometria={realizarLoginBiometrico}
            onEsqueciSenha={
              temUsuario ? recuperarSenha : undefined
            }
            onNavigateCadastro={
              !temUsuario
                ? () => router.push('/(auth)/cadastro')
                : undefined
            }
          />

          <TouchableOpacity
            style={inlineStyles.inline5}
            onPress={() => setLembrarSenha(!lembrarSenha)}
            activeOpacity={0.7}
          >
            <View
              style={dynamicInlineStyles.inline2({ lembrarSenha })}
            >
              {lembrarSenha && (
                <Check
                  size={14}
                  color="#0A0A0A"
                  strokeWidth={3}
                />
              )}
            </View>
            <Text
              style={inlineStyles.inline6}
            >
              Lembrar minha identificação
            </Text>
          </TouchableOpacity>

          <FooterLogin />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
