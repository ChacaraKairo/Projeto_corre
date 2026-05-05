import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import db from '../../database/DatabaseInit';
import {
  hashPassword,
  verifyPassword,
} from '../../utils/auth/passwordHash';
import {
  HASH_ITERATIONS,
  parsePasswordHash,
} from '../../utils/auth/passwordHashFormat';
import { AppRoutes } from '../../constants/routes';
import { logger } from '../../utils/logger';
import { waitForUiFeedback } from '../../utils/ui/waitForUiFeedback';

type UsuarioLogin = {
  id: number;
  nome: string;
  email?: string | null;
  cpf?: string | null;
  senha?: string | null;
};

const CONFIG_LEMBRAR_IDENTIFICACAO = 'lembrar_identificacao';
const LOGIN_FAILED_ATTEMPTS = 'login_failed_attempts';
const LOGIN_LOCKED_UNTIL = 'login_locked_until';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

export const useLogin = () => {
  const router = useRouter();
  const [identificacao, setIdentificacao] = useState('');
  const [senha, setSenha] = useState('');
  const [temUsuario, setTemUsuario] = useState(false);
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [biometriaDisponivel, setBiometriaDisponivel] =
    useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkDeviceForHardware();
    startBounce();
    carregarDadosSalvos();
  }, []);

  const carregarDadosSalvos = async () => {
    try {
      const usuario = await db.getFirstAsync<UsuarioLogin>(
        'SELECT email, cpf FROM perfil_usuario LIMIT 1',
      );

      if (usuario) {
        setTemUsuario(true);

        const config = await db.getFirstAsync<{ valor: string }>(
          'SELECT valor FROM configuracoes_app WHERE chave = ?',
          [CONFIG_LEMBRAR_IDENTIFICACAO],
        );

        if (config && config.valor === 'true') {
          setIdentificacao(usuario.email || usuario.cpf || '');
          setLembrarSenha(true);
        }
      } else {
        setTemUsuario(false);
      }
    } catch (e) {
      if (__DEV__) console.error('[LOGIN] Falha ao carregar dados salvos:', e);
    }
  };

  const checkDeviceForHardware = async () => {
    const compatible =
      await LocalAuthentication.hasHardwareAsync();
    const enrolled =
      await LocalAuthentication.isEnrolledAsync();
    setBiometriaDisponivel(compatible && enrolled);
  };

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

    if (!identificacao.trim() || !senha) {
      setErro(
        'Introduza o E-mail ou CPF e a senha para entrar.',
      );
      return;
    }

    setCarregando(true);

    try {
      await waitForUiFeedback();

      const lockedUntil = await getConfigNumber(LOGIN_LOCKED_UNTIL);
      if (lockedUntil && Date.now() < lockedUntil) {
        const minutosRestantes = Math.ceil(
          (lockedUntil - Date.now()) / 60000,
        );
        setErro(
          `Muitas tentativas incorretas. Tente novamente em ${minutosRestantes} min.`,
        );
        return;
      }

      let idLimpo = identificacao.trim();
      const senhaLimpa = senha.trim();

      // Normalização da Identificação
      const apenasNumeros = idLimpo.replace(/\D/g, '');
      if (
        apenasNumeros.length === 11 &&
        !idLimpo.includes('@')
      ) {
        idLimpo = apenasNumeros.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4',
        );
      } else {
        idLimpo = idLimpo.toLowerCase();
      }

      const usuario = await db.getFirstAsync<UsuarioLogin>(
        'SELECT id, nome, senha FROM perfil_usuario WHERE LOWER(email) = ? OR cpf = ?',
        [idLimpo, idLimpo],
      );

      if (usuario) {
        if (await verifyPassword(senhaLimpa, usuario.senha)) {
          const senhaAtual = parsePasswordHash(usuario.senha);
          await resetarTentativasLogin();
          await db.runAsync(
            'INSERT OR REPLACE INTO configuracoes_app (chave, valor) VALUES (?, ?)',
            [
              CONFIG_LEMBRAR_IDENTIFICACAO,
              lembrarSenha ? 'true' : 'false',
            ],
          );

          router.replace({
            pathname: AppRoutes.dashboard,
            params: { userId: usuario.id },
          });

          if (
            !senhaAtual ||
            senhaAtual.iterations !== HASH_ITERATIONS
          ) {
            void atualizarHashEmSegundoPlano(
              usuario.id,
              senhaLimpa,
            );
          }
        } else {
          await registrarFalhaLogin();
          setErro('Utilizador ou senha incorretos.');
        }
      } else {
        await registrarFalhaLogin();
        setErro('Utilizador ou senha incorretos.');
      }
    } catch (e) {
      logger.error('[LOGIN] Falha na consulta ao banco:', e);
      setErro('Erro ao aceder à base de dados local.');
    } finally {
      setCarregando(false);
    }
  };

  const atualizarHashEmSegundoPlano = async (
    usuarioId: number,
    senhaLimpa: string,
  ) => {
    try {
      const senhaAtualizada = await hashPassword(senhaLimpa);
      await db.runAsync(
        'UPDATE perfil_usuario SET senha = ? WHERE id = ?',
        [senhaAtualizada, usuarioId],
      );
    } catch (error) {
      logger.error('[LOGIN] Falha ao atualizar hash:', error);
    }
  };

  const getConfigNumber = async (chave: string) => {
    const row = await db.getFirstAsync<{ valor: string }>(
      'SELECT valor FROM configuracoes_app WHERE chave = ?',
      [chave],
    );
    const value = Number(row?.valor ?? 0);
    return Number.isFinite(value) ? value : 0;
  };

  const setConfigValue = async (chave: string, valor: string) => {
    await db.runAsync(
      'INSERT OR REPLACE INTO configuracoes_app (chave, valor) VALUES (?, ?)',
      [chave, valor],
    );
  };

  const registrarFalhaLogin = async () => {
    const failedAttempts =
      (await getConfigNumber(LOGIN_FAILED_ATTEMPTS)) + 1;

    await setConfigValue(
      LOGIN_FAILED_ATTEMPTS,
      String(failedAttempts),
    );

    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      await setConfigValue(
        LOGIN_LOCKED_UNTIL,
        String(Date.now() + LOCKOUT_MS),
      );
      await setConfigValue(LOGIN_FAILED_ATTEMPTS, '0');
    }
  };

  const resetarTentativasLogin = async () => {
    await setConfigValue(LOGIN_FAILED_ATTEMPTS, '0');
    await setConfigValue(LOGIN_LOCKED_UNTIL, '0');
  };

  const realizarLoginBiometrico = async () => {
    try {
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage:
            'Aceda ao KORRE com a sua biometria',
          fallbackLabel: 'Utilizar senha',
          disableDeviceFallback: false,
        });

      if (result.success) {
        router.replace(AppRoutes.dashboard);
      }
    } catch (e) {
      if (__DEV__) console.error('[LOGIN] Falha na biometria:', e);
    }
  };

  const recuperarSenha = async () => {
    try {
      const usuario = await db.getFirstAsync<UsuarioLogin>(
        'SELECT nome FROM perfil_usuario LIMIT 1',
      );
      if (usuario) {
        Alert.alert(
          'Segurança Ativa',
          `Olá, ${usuario.nome}. Sua senha não pode ser exibida porque é armazenada em formato protegido.\n\nSe você esqueceu sua senha, será necessário redefinir seus dados (funcionalidade a ser implementada).`,
          [{ text: 'Entendi' }],
        );
      } else {
        Alert.alert(
          'Sem cadastro',
          'Nenhum usuário encontrado no dispositivo.',
        );
      }
    } catch (e) {
      if (__DEV__) console.error('[LOGIN] Falha ao recuperar senha:', e);
      Alert.alert(
        'Erro',
        'Não foi possível acessar os dados de segurança.',
      );
    }
  };

  return {
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
  };
};
