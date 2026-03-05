import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { DatabaseInit } from '../database/DatabaseInit'; // Verifique se o caminho src/ está correto
import db from '../database/DatabaseInit';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function setup() {
      try {
        // Inicializa as tabelas do SQLite para o MeuCorre
        DatabaseInit();

        // Verifica se já existe um perfil cadastrado
        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );
        setHasUser(result.length > 0);
      } catch (error) {
        console.error('Erro na inicialização:', error);
      } finally {
        // Aguarda um pouco mais para a Splash (index) ser visível (opcional)
        setTimeout(() => setLoading(false), 2000);
      }
    }
    setup();
  }, []);

  useEffect(() => {
    if (loading) return;

    const rootSegment = segments[0];

    // Se NÃO tem usuário e NÃO está na tela de cadastro, manda registrar
    if (!hasUser && rootSegment !== 'cadastro') {
      router.replace('/cadastro');
    }
    // Se TEM usuário e está na Splash (index) ou Cadastro, manda para o Login
    else if (
      hasUser &&
      (rootSegment === undefined ||
        rootSegment === 'cadastro')
    ) {
      router.replace('/login');
    }
  }, [hasUser, loading, segments]);

  // Enquanto carrega o banco, o index.tsx (Splash) será exibido automaticamente
  // através do componente Stack abaixo.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />{' '}
      {/* Sua Tela de Carregamento */}
      <Stack.Screen name="login" />{' '}
      {/* Sua Nova Tela de Login */}
      <Stack.Screen name="cadastro" />{' '}
      {/* Tela de Cadastro */}
      <Stack.Screen name="dashboard" />{' '}
      {/* Tela Principal */}
    </Stack>
  );
}
