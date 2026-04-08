import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db, { DatabaseInit } from '../database/DatabaseInit';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function setup() {
      try {
        DatabaseInit();

        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );

        setHasUser(result.length > 0);
      } catch (error) {
        // Erro silencioso conforme padrão de limpeza
      } finally {
        setTimeout(() => setIsReady(true), 2000);
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
      </Stack>
    </SafeAreaProvider>
  );
}
