import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import db from '../../database/DatabaseInit';

export const useLogin = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [biometriaDisponivel, setBiometriaDisponivel] =
    useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkDeviceForHardware();
    startBounce(); // Adicionada a chamada da animação
  }, []);

  // 1. Função que estava faltando
  const checkDeviceForHardware = async () => {
    const compatible =
      await LocalAuthentication.hasHardwareAsync();
    const enrolled =
      await LocalAuthentication.isEnrolledAsync();
    setBiometriaDisponivel(compatible && enrolled);
  };

  // 2. Função de animação para o ícone (baseada no seu protótipo)
  const startBounce = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const realizarLoginManual = async () => {
    setErro('');
    if (!nome.trim() || !senha) {
      setErro('Introduza o nome e a senha para entrar.');
      return;
    }
    setCarregando(true);
    try {
      const usuario: any = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario WHERE nome = ? AND senha = ?',
        [nome.trim(), senha],
      );
      if (usuario) {
        router.replace('/');
      } else {
        setErro('Utilizador ou senha incorretos.');
      }
    } catch (e) {
      setErro('Erro ao aceder à base de dados local.');
    } finally {
      setCarregando(false);
    }
  };

  const realizarLoginBiometrico = async () => {
    try {
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage:
            'Aceda ao MeuCorre com a sua biometria',
          fallbackLabel: 'Utilizar senha',
          disableDeviceFallback: false,
        });

      if (result.success) {
        router.replace('/');
      }
    } catch (e) {
      console.error('Erro na biometria:', e);
    }
  };

  return {
    nome,
    setNome,
    senha,
    setSenha,
    carregando,
    erro,
    biometriaDisponivel,
    bounceAnim,
    realizarLoginManual,
    realizarLoginBiometrico,
  };
};
