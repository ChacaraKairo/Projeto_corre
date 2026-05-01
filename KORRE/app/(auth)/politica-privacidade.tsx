import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppRoutes } from '../../constants/routes';
import { useTema } from '../../hooks/modo_tema';
import { styles } from '../../styles/telas/Termos/termosStyles';
import { safeBack } from '../../utils/navigation/safeBack';

const BulletPoint = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <View style={styles.bulletContainer}>
    <Text style={[styles.bullet, { color: '#00C853' }]}>
      {'\u2022'}
    </Text>
    <Text style={[styles.bulletText, { color }]}>
      {children}
    </Text>
  </View>
);

export default function PoliticaPrivacidadeScreen() {
  const router = useRouter();
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const bgColor = isDark ? '#0A0A0A' : '#F5F5F5';
  const textColor = isDark ? '#FFFFFF' : '#0A0A0A';
  const cardColor = isDark ? '#161616' : '#FFFFFF';
  const borderColor = isDark ? '#222' : '#E0E0E0';
  const textMuted = isDark ? '#AAA' : '#555';

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingTop:
            Platform.OS === 'android'
              ? StatusBar.currentHeight
              : 0,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: borderColor },
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() =>
              safeBack(router, AppRoutes.configuracoes)
            }
            style={[
              styles.btnVoltar,
              { backgroundColor: cardColor },
            ]}
          >
            <ArrowLeft size={20} color={textColor} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: textColor },
            ]}
          >
            Politica de Privacidade
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <ShieldCheck size={48} color="#00C853" />
        </View>

        <Text
          style={[styles.mainTitle, { color: textColor }]}
        >
          Politica de Privacidade do KORRE
        </Text>
        <Text
          style={[styles.lastUpdate, { color: textMuted }]}
        >
          Ultima atualizacao: 1 de maio de 2026
        </Text>

        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          Esta Politica de Privacidade descreve como o
          KORRE, da Koru Company, trata dados e permissoes
          do usuario.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Dados armazenados
        </Text>
        <BulletPoint color={textMuted}>
          Nome, e-mail, CPF opcional e senha protegida.
        </BulletPoint>
        <BulletPoint color={textMuted}>
          Foto de perfil escolhida pelo usuario.
        </BulletPoint>
        <BulletPoint color={textMuted}>
          Dados de veiculos, ganhos, despesas, manutencoes,
          metas, MEI e preferencias do aplicativo.
        </BulletPoint>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Uso da camera
        </Text>
        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          O KORRE solicita acesso a camera somente quando o
          usuario escolhe tirar uma foto de perfil. A camera
          nao e usada em segundo plano, nao grava video, nao
          grava audio e nao e usada para monitoramento.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Uso local e backups
        </Text>
        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          Os dados principais ficam no aparelho, em banco
          SQLite e arquivos locais do app. Backups podem
          conter dados pessoais, financeiros e de veiculos;
          por isso devem ser guardados em local seguro.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Compartilhamento
        </Text>
        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          A Koru Company nao vende dados pessoais ou
          financeiros. O usuario pode compartilhar
          manualmente relatorios ou backups com outros apps,
          e esse compartilhamento depende da escolha do
          proprio usuario.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Notificacoes e seguranca
        </Text>
        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          O KORRE pode enviar lembretes de manutencao,
          backup, metas e DAS do MEI. O acesso ao app pode
          usar senha local protegida e biometria do aparelho
          quando disponivel.
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: textColor },
          ]}
        >
          Exclusao de dados
        </Text>
        <Text
          style={[styles.paragraph, { color: textMuted }]}
        >
          O usuario pode editar ou apagar dados dentro do
          aplicativo e tambem pode limpar os dados locais
          pelas configuracoes do Android.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
