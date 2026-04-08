import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

// Importação dos Estilos
import { dashboardStyles as styles } from '../../styles/telas/Dashboard/dashboardStyles';

// Importação dos Hooks
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { useTema } from '../../hooks/modo_tema';
import { useOficina } from '../../hooks/oficina/useOficina'; // Hook Mestre da Oficina

// Importação dos Componentes
import { FinanceiroMensal } from '../../components/telas/Dashboard/FinanceiroMensal';
import { FooterCalculadora } from '../../components/telas/Dashboard/FooterCalculadora';
import { IndicesMCCard } from '../../components/telas/Dashboard/IndicesMCCard';
import { GanhosCard } from '../../components/telas/Dashboard/GanhosCard';
import { GastosCard } from '../../components/telas/Dashboard/GastosCard';
import { HeaderDashboard } from '../../components/telas/Dashboard/HeaderDashboard';
import { ModalUpdateKm } from '../../components/telas/Dashboard/ModalUpdateKm';
import { StatusGrid } from '../../components/telas/Dashboard/StatusGrid';
import { UltimasMovimentacoes } from '../../components/telas/Dashboard/UltimasMovimentacoes';
import { VeiculoCard } from '../../components/telas/Dashboard/VeiculoCard';

export default function DashboardScreen() {
  const {
    loading,
    usuario,
    frase,
    veiculo,
    ganhos,
    gastos,
    meta,
    tipoMeta,
    ganhosMensal,
    gastosMensal,
    qtdGanhos,
    qtdGastos,
    movimentacoes,
    onPressConfig,
    onTrocarVeiculo,
    onIrParaOficina,
    onUpdateKm,
    modalKmAberto,
    setModalKmAberto,
    novoKm,
    setNovoKm,
    salvarKm,
    abrirCalculadora,
  } = useDashboard();

  const { tema } = useTema();
  const isDark = tema === 'escuro';

  // Buscamos apenas os dados, a lógica pesada agora mora dentro do StatusGrid
  const {
    itensVisiveis,
    temManutencaoBanco,
    calcularProgresso,
  } = useOficina();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" color="#00C853" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5' },
      ]}
    >
      <HeaderDashboard
        nome={usuario?.nome || 'Piloto'}
        fraseMotivacional={frase || 'Bora faturar!'}
        fotoPerfil={usuario?.foto_uri}
        onPressConfig={onPressConfig}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <VeiculoCard
          veiculo={veiculo}
          rendimento="0.15"
          onGaragem={onTrocarVeiculo}
          onOficina={onIrParaOficina}
        />

        {/* Repassamos os dados brutos para o StatusGrid */}
        <StatusGrid
          kmAtual={veiculo?.km_atual ?? 0}
          itensVisiveis={itensVisiveis}
          temManutencaoBanco={temManutencaoBanco}
          calcularProgresso={calcularProgresso}
          onUpdateKm={onUpdateKm}
          onOpenOficina={onIrParaOficina}
        />

        <IndicesMCCard
          custoPorKm={veiculo?.custo_km_calculado || 0}
          custoPorMinuto={
            veiculo?.custo_minuto_calculado || 0
          }
        />

        <GanhosCard
          ganhosTotal={ganhos}
          metaValor={meta}
          tipoMeta={tipoMeta}
          qtdGanhos={qtdGanhos}
        />

        <GastosCard valor={gastos} qtdGastos={qtdGastos} />

        <FinanceiroMensal
          ganhos={ganhosMensal}
          gastos={gastosMensal}
        />

        <UltimasMovimentacoes dados={movimentacoes} />
      </ScrollView>

      <FooterCalculadora onPress={abrirCalculadora} />

      <ModalUpdateKm
        visible={modalKmAberto}
        onClose={() => setModalKmAberto(false)}
        onSave={salvarKm}
        km={novoKm}
        setKm={setNovoKm}
      />
    </View>
  );
}
