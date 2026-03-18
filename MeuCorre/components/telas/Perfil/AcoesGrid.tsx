import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Bell,
  ShieldCheck,
  Download,
  BarChart3,
} from 'lucide-react-native';
import { useRouter } from 'expo-router'; // <-- Importado o useRouter
import { styles } from '../../../styles/telas/Perfil/perfilStyles';
import { useTema } from '../../../hooks/modo_tema';

export const AcoesGrid = () => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';
  const router = useRouter(); // <-- Inicializado o router

  return (
    <View>
      <Text
        style={[
          styles.secaoTitle,
          { color: isDark ? '#FFFFFF' : '#000000' },
        ]}
      >
        Configurações
      </Text>
      <View style={styles.gridAcoes}>
        {/* BOTÃO DE NOTIFICAÇÕES ATUALIZADO */}
        <TouchableOpacity
          style={[
            styles.btnAcao,
            {
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderColor: isDark ? '#222' : '#E0E0E0',
              borderWidth: 1,
            },
          ]}
          onPress={() => router.push('/notificacoes')} // <-- Redirecionando para a nova tela
        >
          <Bell size={24} color="#00C853" />
          <Text
            style={[
              styles.btnAcaoTexto,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Notificações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnAcao,
            {
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderColor: isDark ? '#222' : '#E0E0E0',
              borderWidth: 1,
            },
          ]}
          onPress={() =>
            Alert.alert('Segurança', 'Em breve')
          }
        >
          <ShieldCheck size={24} color="#00C853" />
          <Text
            style={[
              styles.btnAcaoTexto,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Segurança
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnAcao,
            {
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderColor: isDark ? '#222' : '#E0E0E0',
              borderWidth: 1,
            },
          ]}
          onPress={() =>
            Alert.alert('Exportar', 'Em breve')
          }
        >
          <Download size={24} color="#00C853" />
          <Text
            style={[
              styles.btnAcaoTexto,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Exportar CSV
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnAcao,
            {
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderColor: isDark ? '#222' : '#E0E0E0',
              borderWidth: 1,
            },
          ]}
          onPress={() =>
            Alert.alert('Relatórios', 'Em breve')
          }
        >
          <BarChart3 size={24} color="#00C853" />
          <Text
            style={[
              styles.btnAcaoTexto,
              { color: isDark ? '#FFFFFF' : '#000000' },
            ]}
          >
            Relatórios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
