// MeuCorre/app/_layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoadingOverlay } from '../components/ui/AppLoadingOverlay';
import { AppRoutes } from '../constants/routes';
import db, { DatabaseInit } from '../database/DatabaseInit';
import '../locales/i18n';
import { executarVerificacoesLocais } from '../notifications/LocalNotificationScheduler';
import { NotificationHandler } from '../notifications/NotificationHandler';

import { inlineStyles } from '../styles/generated-inline/app/_layoutInlineStyles';
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const subscriptions: { remove: () => void }[] = [];

    async function setup() {
      try {
        DatabaseInit();
        await NotificationHandler.setupForegroundHandler();
        subscriptions.push(
          await NotificationHandler.listenToReceived(),
        );
        const notificationSub =
          await NotificationHandler.listenToClicks();
        subscriptions.push(notificationSub);
        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );
        const existeUsuario = result.length > 0;

        setHasUser(existeUsuario);

        if (existeUsuario) {
          await executarVerificacoesLocais();
        }
      } catch (error) {
        if (__DEV__) {
          console.error(
            '[RootLayout] Falha no setup inicial:',
            error,
          );
        }
      } finally {
        setIsReady(true);
      }
    }
    setup();

    return () => {
      subscriptions.forEach((subscription) =>
        subscription.remove(),
      );
    };
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
        router.replace(AppRoutes.login);
      } else {
        router.replace(AppRoutes.cadastro);
      }
    }
  }, [isReady, hasUser, segments, router]);

  if (!isReady) {
    return (
      <SafeAreaProvider style={inlineStyles.inline4}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0A0A',
          }}
        >
          <ActivityIndicator size="large" color="#00C853" />
          <Text
            style={{
              color: '#00C853',
              fontSize: 12,
              fontWeight: '900',
              marginTop: 12,
              textTransform: 'uppercase',
            }}
          >
            Carregando KORRE
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={inlineStyles.inline4}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="relatorios" />
      </Stack>
      <AppLoadingOverlay />
    </SafeAreaProvider>
  );
}
