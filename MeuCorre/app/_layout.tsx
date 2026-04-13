import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db, { DatabaseInit } from '../database/DatabaseInit';
// Importe o handler que criamos na pasta de notificações
import { NotificationHandler } from '../notifications/NotificationHandler';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function setup() {
      try {
        // 1. Inicializa o Banco de Dados
        DatabaseInit();

        // 2. Configura Notificações (Foreground e Click Listener)
        NotificationHandler.setupForegroundHandler();
        const notificationSub =
          NotificationHandler.listenToClicks();

        // Verifica existência de usuário
        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );

        setHasUser(result.length > 0);

        // Retorna a limpeza do listener de notificação
        return () => notificationSub.remove();
      } catch (error) {
        // Erro silencioso
      } finally {
        setTimeout(() => setIsReady(true), 1500); // Reduzi um pouco para melhorar UX
      }
    }
    setup();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const rootSegment = segments[0] as string | undefined;

    const isAtRoot =
      rootSegment === undefined ||
      rootSegment === 'index' ||
      rootSegment === '';

    if (isAtRoot) {
      if (hasUser) {
        // Se tem usuário, manda para o Login (ou Tabs se já estiver logado/sessão)
        router.replace('/(auth)/login' as any);
      } else {
        router.replace('/(auth)/cadastro' as any);
      }
    }
  }, [isReady, hasUser, segments, router]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        {/* Adicionado o grupo de relatórios na pilha principal */}
        <Stack.Screen name="(relatorios)" />
      </Stack>
    </SafeAreaProvider>
  );
}
