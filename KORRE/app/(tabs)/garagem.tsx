import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Plus,
  RefreshCw,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useGaragem } from '../../hooks/garagem/useGaragem';
import { styles } from '../../styles/telas/Garagem/garagemStyles';
import { CardVeiculoGaragem } from '../../components/telas/Garagem/CardVeiculoGaragem';
import { ModalNovoVeiculo } from '../../components/telas/Garagem/ModalNovoVeiculo';
import { useTema } from '../../hooks/modo_tema';
import { inlineStyles } from '../../styles/generated-inline/app/(tabs)/garagemInlineStyles';
// Importaremos os modais a seguir

export default function GaragemScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    veiculos,
    loading,
    ativarVeiculo,
    adicionarVeiculo,
    modalNovo,
    setModalNovo,
    solicitarExclusao,
    // modalTroca, modalDelete, etc... (Vamos ligá-los no próximo passo)
  } = useGaragem();

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5' },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.btnVoltar,
            !isDark && {
              backgroundColor: '#FFFFFF',
              borderColor: '#E0E0E0',
              borderWidth: 1,
            },
          ]}
          onPress={() => router.push('/(tabs)/dashboard')}
        >
          <ArrowLeft
            size={20}
            color={isDark ? '#FFF' : '#000'}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? '#FFF' : '#000' },
          ]}
        >
          {t('garagem.titulo')}
        </Text>
        <View style={inlineStyles.inline1} />
      </View>

      {loading ? (
        <View
          style={inlineStyles.inline2}
        >
          <ActivityIndicator size="large" color="#00C853" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Resumo */}
          <View style={styles.resumoContainer}>
            <View>
              <Text
                style={[
                  styles.resumoLabel,
                  { color: isDark ? '#888' : '#555' },
                ]}
              >
                {t('garagem.frota')}
              </Text>
              <Text
                style={[
                  styles.resumoValor,
                  { color: isDark ? '#FFF' : '#000' },
                ]}
              >
                {veiculos.length} {t('garagem.maquinas')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnAddVeiculo}
              onPress={() => setModalNovo(true)}
              activeOpacity={0.8}
            >
              <Plus
                size={24}
                color="#0A0A0A"
                strokeWidth={3}
              />
            </TouchableOpacity>
          </View>

          {/* Lista de Veículos */}
          {veiculos.map((v) => (
            <CardVeiculoGaragem
              key={v.id}
              v={v}
              onAtivar={ativarVeiculo}
              onExcluir={solicitarExclusao}
            />
          ))}

          {/* Nota Informativa */}
          <View
            style={[
              styles.notaInfo,
              {
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFFFFF',
                borderColor: isDark ? '#222' : '#E0E0E0',
                borderWidth: 1,
              },
            ]}
          >
            <RefreshCw size={24} color="#00C853" />
            <Text
              style={[
                styles.notaTexto,
                { color: isDark ? '#AAA' : '#555' },
              ]}
            >
              {t('garagem.nota_1')}
              <Text
                style={inlineStyles.inline3}
              >
                {t('garagem.nota_dashboard')}
              </Text>
              {t('garagem.nota_2')}
            </Text>
          </View>
        </ScrollView>
      )}

      <ModalNovoVeiculo
        visible={modalNovo}
        onClose={() => setModalNovo(false)}
        onSave={adicionarVeiculo}
      />
    </SafeAreaView>
  );
}
