import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import db from '../database/DatabaseInit';
// Você pode criar um estilo específico para a Splash em src/styles/SplashStyles.ts
import { styles } from '../styles/SplashStyles';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Configura a barra de navegação para ser visível e não sobrepor o app
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#0A0A0A'); // Fundo preto (mesmo do app)
      NavigationBar.setButtonStyleAsync('light'); // Ícones brancos
      NavigationBar.setVisibilityAsync('visible');
    }

    const verificarUsuarioUnico = async () => {
      try {
        // Verifica se existe ALGUM registro na tabela de usuários
        const usuarioExistente = await db.getFirstAsync(
          'SELECT id FROM perfil_usuario LIMIT 1',
        );

        if (usuarioExistente) {
          // Se já tem dono, vai direto para o Login (bloqueia cadastro)
          router.replace('/login' as any);
        } else {
          // Se está vazio, libera o Cadastro
          router.replace('/cadastro' as any);
        }
      } catch (error) {
        console.error(
          'Erro ao verificar usuário inicial:',
          error,
        );
      }
    };

    // Aguarda 2 segundos para mostrar a marca e depois decide o destino
    const timeout = setTimeout(verificarUsuarioUnico, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Garante que não apareça barra de navegação durante o loading */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Logo do MeuCorre ou algo que remeta ao seu projeto */}
      <Image
        source={require('../assets/images/android-icon-foreground.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" color="#00C853" />
      <Text style={styles.text}>
        Carregando dados locais...
      </Text>
    </View>
  );
}
