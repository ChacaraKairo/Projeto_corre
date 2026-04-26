import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useTema } from '../hooks/modo_tema';
import { useNotificacoes } from '../hooks/notificacoes/useNotificacoes';
import { styles } from '../styles/telas/Perfil/perfilStyles'; import { inlineStyles } from '../styles/generated-inline/app/notificacoesInlineStyles';
import { dynamicInlineStyles } from '../styles/generated-dynamic/app/notificacoesDynamicStyles';
// Aproveitando os seus estilos base

export default function NotificacoesScreen() {
  const router = useRouter();
  const { tema } = useTema();
  const isDark = tema === 'escuro';
  const {
    notificacoes,
    marcarComoLida,
    limparHistorico,
    dispararNotificacao,
  } = useNotificacoes();

  const getIcone = (tipo: string) => {
    switch (tipo) {
      case 'alerta':
        return <AlertTriangle size={24} color="#F44336" />;
      case 'sucesso':
        return <CheckCircle2 size={24} color="#00C853" />;
      default:
        return <Bell size={24} color="#2196F3" />;
    }
  };

  return (
    <View
      style={[
        { flex: 1 },
        { backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5' },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { paddingBottom: 10 }]}>
        <View
          style={inlineStyles.inline1}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={dynamicInlineStyles.inline1({ isDark })}
          >
            <ArrowLeft
              size={20}
              color={isDark ? '#FFF' : '#000'}
            />
          </TouchableOpacity>
          <Text
            style={dynamicInlineStyles.inline2({ isDark })}
          >
            Notificações
          </Text>
        </View>
        <TouchableOpacity
          onPress={limparHistorico}
          style={inlineStyles.inline2}
        >
          <Trash2 size={20} color="#F44336" />
        </TouchableOpacity>
      </View>

      {/* Botão de Teste (Remova quando for publicar a app) */}
      <TouchableOpacity
        onPress={() =>
          dispararNotificacao(
            '💰 Meta Próxima!',
            'Faltam apenas R$ 25 para bateres a tua meta diária!',
            'sucesso',
          )
        }
        style={inlineStyles.inline3}
      >
        <Text
          style={inlineStyles.inline4}
        >
          TESTAR NOTIFICAÇÃO 📲
        </Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={inlineStyles.listContent}
      >
        {notificacoes.length === 0 ? (
          <Text
            style={inlineStyles.inline5}
          >
            Nenhuma notificação no momento.
          </Text>
        ) : (
          notificacoes.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              onPress={() => marcarComoLida(notif.id)}
              style={dynamicInlineStyles.inline3({ isDark, notif })}
            >
              <View
                style={inlineStyles.inline6}
              >
                {getIcone(notif.tipo)}
              </View>
              <View style={inlineStyles.inline7}>
                <Text
                  style={dynamicInlineStyles.inline4({ isDark })}
                >
                  {notif.titulo}
                </Text>
                <Text
                  style={dynamicInlineStyles.inline5({ isDark })}
                >
                  {notif.mensagem}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
