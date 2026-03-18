import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

// Importação dos Estilos (Caminho atualizado)
import { dashboardStyles as styles } from '../../styles/telas/Dashboard/dashboardStyles';

// Importação do Hook Personalizado
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { useTema } from '../../hooks/modo_tema';

// Importação dos Componentes (Caminhos atualizados)
import { FinanceiroMensal } from '../../components/telas/Dashboard/FinanceiroMensal';
import { FooterCalculadora } from '../../components/telas/Dashboard/FooterCalculadora';
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
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço para o Footer
      >
        <VeiculoCard
          veiculo={veiculo}
          rendimento="0.15"
          onTrocar={onTrocarVeiculo}
          onOficina={onIrParaOficina}
        />

        <StatusGrid
          kmAtual={veiculo?.km_atual || 12500}
          statusManutencao="warning"
          descManutencao="Verifique o óleo"
          onUpdateKm={onUpdateKm}
          onOpenOficina={() => {}}
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
