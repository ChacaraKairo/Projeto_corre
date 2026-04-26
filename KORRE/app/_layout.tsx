// MeuCorre/app/_layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db, { DatabaseInit } from '../database/DatabaseInit';
import { NotificationHandler } from '../notifications/NotificationHandler';

import { inlineStyles } from '../styles/generated-inline/app/_layoutInlineStyles';
import { dynamicInlineStyles } from '../styles/generated-dynamic/app/_layoutDynamicStyles';
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function setup() {
      try {
        DatabaseInit();
        NotificationHandler.setupForegroundHandler();
        const notificationSub =
          NotificationHandler.listenToClicks();

        const result = await db.getAllAsync<{ id: number }>(
          'SELECT id FROM perfil_usuario LIMIT 1;',
        );

        setHasUser(result.length > 0);
        return () => notificationSub.remove();
      } catch (error) {
        // Erro silencioso
      } finally {
        setTimeout(() => setIsReady(true), 1000);
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
        router.replace('/(auth)/login');
      } else {
        router.replace('/(auth)/cadastro');
      }
    }
  }, [isReady, hasUser, segments, router]);

  // --- MENU DE ATALHOS NA BARRA INFERIOR (APENAS DEV) ---
  const DevMenu = () => {
    if (!__DEV__) return null;

    const rotas = [
      { nome: 'Login', path: '/(auth)/login' },
      { nome: 'Cadastro', path: '/(auth)/cadastro' },
      { nome: 'Home', path: '/(tabs)/dashboard' },
      { nome: 'Ganhos', path: '/(tabs)/finance' },
      { nome: 'Oficina', path: '/(tabs)/oficina' },
      { nome: 'Garagem', path: '/(tabs)/garagem' },
      { nome: 'Origem', path: '/(tabs)/origemganhos' },
      { nome: 'MEI', path: '/relatorios/temometro_mei' },
      { nome: 'Lucro', path: '/relatorios/balanco_dre' },
      { nome: 'Relatórios', path: '/(tabs)/relatorios' },
      { nome: 'Config', path: '/(tabs)/configuracoes' },
      { nome: 'Perfil', path: '/(tabs)/perfil' },
      { nome: 'Notif', path: '/notificacoes' },
      { nome: 'DB', path: '/(tabs)/explore' },
      { nome: 'Calc', path: '/calculadora' },
      { nome: 'Termos', path: '/(auth)/termos' },
      { nome: 'Suporte', path: '/(tabs)/suporte' },
      { nome: 'Histórico', path: '/(tabs)/historico' },
      { nome: 'Gastos', path: '/finance/gastos' },
      { nome: 'Ganhos', path: '/finance/ganhos' },
    ];

    return (
      <View
        style={dynamicInlineStyles.inline1({})}
      >
        <Text
          style={inlineStyles.inline1}
        >
          KORRE DEV BAR
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={inlineStyles.devMenuContent}
        >
          {rotas.map((rota) => (
            <TouchableOpacity
              key={rota.path}
              onPress={() => router.push(rota.path as any)}
              style={inlineStyles.inline2}
            >
              <Text
                style={inlineStyles.inline3}
              >
                {rota.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaProvider
      style={inlineStyles.inline4}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="relatorios" />
      </Stack>
      {/* O menu fica por cima de tudo no final do componente */}
      <DevMenu />
    </SafeAreaProvider>
  );
}
