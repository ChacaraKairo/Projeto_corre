import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Filter,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BarChart3,
  Target,
  Clock,
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Briefcase,
  Fuel,
  Utensils,
  Wrench,
  Edit3,
  Trash2,
  X,
  CarFront,
  AlertCircle,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Hooks & Estilos
import { useTema } from '../../hooks/modo_tema';
import { useHistorico } from '../../hooks/historico/useHistorico';
import { styles } from '../../styles/telas/Historico/historicoStyles';

export default function HistoricoScreen() {
  const router = useRouter();
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const {
    loading,
    veiculos,
    veiculoFiltro,
    setVeiculoFiltro,
    modalVeiculo,
    setModalVeiculo,
    periodo,
    mudarPeriodo,
    getLabelData,
    navegarData,
    dadosResumo,
    movimentacoes,
    registroSelecionado,
    abrirOpcoesRegistro,
    fecharOpcoes,
    editarRegistro,
    deletarRegistro,
  } = useHistorico();

  // Cores Dinâmicas
  const bgColor = isDark ? '#0A0A0A' : '#F5F5F5';
  const cardColor = isDark ? '#161616' : '#FFFFFF';
  const borderColor = isDark ? '#222' : '#E0E0E0';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const textMuted = isDark ? '#888' : '#666';

  // Mapa de Ícones Nativo
  const renderIcon = (iconId: string, color: string) => {
    const size = 20;
    const icons: any = {
      Smartphone: <Smartphone size={size} color={color} />,
      Car: <Car size={size} color={color} />,
      Navigation: <Navigation size={size} color={color} />,
      Package: <Package size={size} color={color} />,
      Truck: <Truck size={size} color={color} />,
      Briefcase: <Briefcase size={size} color={color} />,
      Fuel: <Fuel size={size} color={color} />,
      Utensils: <Utensils size={size} color={color} />,
      Wrench: <Wrench size={size} color={color} />,
      AlertCircle: (
        <AlertCircle size={size} color={color} />
      ),
    };
    return (
      icons[iconId] || (
        <Briefcase size={size} color={color} />
      )
    );
  };

  // Cálculos do Gráfico
  const maxVal = Math.max(
    dadosResumo.ganhos,
    dadosResumo.gastos,
  );
  const hGanhos =
    maxVal > 0 ? (dadosResumo.ganhos / maxVal) * 100 : 0;
  const hGastos =
    maxVal > 0 ? (dadosResumo.gastos / maxVal) * 100 : 0;

  const veiculoAtivoObj = veiculos.find(
    (v) => v.id === veiculoFiltro,
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: bgColor },
      ]}
    >
      {/* HEADER E NAVEGAÇÃO DE DATAS */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: bgColor,
            borderBottomColor: borderColor,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={[
              styles.btnIcon,
              { backgroundColor: cardColor, borderColor },
            ]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={textMuted} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Histórico</Text>
          <TouchableOpacity
            style={[
              styles.btnIcon,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <Filter size={20} color={textMuted} />
          </TouchableOpacity>
        </View>

        {/* Tabs de Período */}
        <View
          style={[
            styles.tabsContainer,
            {
              backgroundColor: isDark ? '#111' : '#EAEAEA',
              borderColor: isDark ? '#1A1A1A' : '#D4D4D4',
            },
          ]}
        >
          {(['dia', 'semana', 'mes'] as const).map((p) => {
            const ativo = periodo === p;
            return (
              <TouchableOpacity
                key={p}
                onPress={() => mudarPeriodo(p)}
                style={[
                  styles.tabBtn,
                  ativo && {
                    backgroundColor: '#00C853',
                    shadowColor: '#00C853',
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabTexto,
                    {
                      color: ativo ? '#0A0A0A' : textMuted,
                    },
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Seletor de Data */}
        <View
          style={[
            styles.navDataContainer,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          <TouchableOpacity
            onPress={() => navegarData(-1)}
            style={{ padding: 8 }}
          >
            <ChevronLeft size={20} color={textMuted} />
          </TouchableOpacity>
          <View style={styles.navDataCentro}>
            <CalendarDays size={16} color="#00C853" />
            <Text
              style={[
                styles.navDataTexto,
                { color: textColor },
              ]}
            >
              {getLabelData()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navegarData(1)}
            style={{ padding: 8 }}
          >
            <ChevronRight size={20} color={textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão de Filtro de Veículo (Fixado abaixo do header) */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 8,
          backgroundColor: bgColor,
        }}
      >
        <TouchableOpacity
          style={[
            styles.filtroVeiculoBtn,
            { backgroundColor: cardColor, borderColor },
          ]}
          onPress={() => setModalVeiculo(true)}
        >
          <CarFront size={16} color={textMuted} />
          <Text
            style={{
              color: textColor,
              fontWeight: 'bold',
              marginLeft: 8,
            }}
          >
            {veiculoFiltro === 'todos'
              ? 'Todos os Veículos'
              : veiculoAtivoObj
                ? `${veiculoAtivoObj.modelo} - ${veiculoAtivoObj.placa}`
                : 'Veículo Desconhecido'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: 8 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00C853"
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            {/* GRÁFICO E RESUMO */}
            <View
              style={[
                styles.chartCard,
                { backgroundColor: cardColor, borderColor },
              ]}
            >
              <View style={styles.chartTitleContainer}>
                <BarChart3 size={18} color="#00C853" />
                <Text
                  style={[
                    styles.chartTitle,
                    { color: textMuted },
                  ]}
                >
                  Análise Comparativa
                </Text>
              </View>

              {/* Gráfico de Barras Nativo */}
              <View style={styles.chartBarrasContainer}>
                {/* Barra Ganhos */}
                <View style={styles.barraWrapper}>
                  <Text
                    style={[
                      styles.barraValorFlutuante,
                      { color: '#00C853' },
                    ]}
                  >
                    R${dadosResumo.ganhos.toFixed(0)}
                  </Text>
                  <View
                    style={[
                      styles.barraFundo,
                      {
                        backgroundColor:
                          'rgba(0, 200, 83, 0.1)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.barraPreenchimento,
                        {
                          height: `${hGanhos}%`,
                          backgroundColor: '#00C853',
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barraLabel,
                      { color: textColor },
                    ]}
                  >
                    Ganhos
                  </Text>
                </View>

                {/* Barra Gastos */}
                <View style={styles.barraWrapper}>
                  <Text
                    style={[
                      styles.barraValorFlutuante,
                      { color: '#EF4444' },
                    ]}
                  >
                    R${dadosResumo.gastos.toFixed(0)}
                  </Text>
                  <View
                    style={[
                      styles.barraFundo,
                      {
                        backgroundColor:
                          'rgba(239, 68, 68, 0.1)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.barraPreenchimento,
                        {
                          height: `${hGastos}%`,
                          backgroundColor: '#EF4444',
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barraLabel,
                      { color: textColor },
                    ]}
                  >
                    Gastos
                  </Text>
                </View>
              </View>

              {/* Mini Cards Ganhos/Gastos */}
              <View style={styles.gridResumo}>
                <View
                  style={[
                    styles.miniCardResumo,
                    {
                      backgroundColor: isDark
                        ? 'rgba(10,10,10,0.4)'
                        : '#F9F9F9',
                      borderColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.miniCardLabel,
                      { color: textMuted },
                    ]}
                  >
                    Entradas
                  </Text>
                  <Text
                    style={[
                      styles.miniCardValor,
                      { color: '#00C853' },
                    ]}
                  >
                    R$ {dadosResumo.ganhos.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.miniCardResumo,
                    {
                      backgroundColor: isDark
                        ? 'rgba(10,10,10,0.4)'
                        : '#F9F9F9',
                      borderColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.miniCardLabel,
                      { color: textMuted },
                    ]}
                  >
                    Saídas
                  </Text>
                  <Text
                    style={[
                      styles.miniCardValor,
                      { color: '#EF4444' },
                    ]}
                  >
                    R$ {dadosResumo.gastos.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* Card Saldo Líquido */}
              <View style={styles.saldoCard}>
                <View>
                  <Text style={styles.saldoLabel}>
                    Saldo Líquido
                  </Text>
                  <Text style={styles.saldoValor}>
                    R$ {dadosResumo.saldo.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.saldoIconBox}>
                  <Target
                    size={28}
                    color="#0A0A0A"
                    strokeWidth={2.5}
                  />
                </View>
              </View>
            </View>

            {/* LISTAGEM DE MOVIMENTAÇÕES (Clicável para Editar/Apagar) */}
            <View style={styles.listHeader}>
              <Text
                style={[
                  styles.listTitle,
                  { color: textMuted },
                ]}
              >
                Histórico de Registos
              </Text>
              <TouchableOpacity>
                <Text style={styles.btnExportar}>
                  Exportar
                </Text>
              </TouchableOpacity>
            </View>

            {movimentacoes.length === 0 ? (
              <View
                style={{
                  padding: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: textMuted }}>
                  Não há registos neste período.
                </Text>
              </View>
            ) : (
              movimentacoes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.itemCard,
                    {
                      backgroundColor: cardColor,
                      borderColor,
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => abrirOpcoesRegistro(item)} // AQUI ABRE O MENU
                >
                  <View style={styles.itemLeft}>
                    <View
                      style={[
                        styles.itemIconBox,
                        {
                          backgroundColor: `${item.cor}20`,
                        },
                      ]}
                    >
                      {renderIcon(item.iconId, item.cor)}
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.itemTitle,
                          { color: textColor },
                        ]}
                      >
                        {item.categoria}
                      </Text>
                      <View style={styles.itemDataBox}>
                        <Clock
                          size={10}
                          color={textMuted}
                        />
                        <Text
                          style={[
                            styles.itemDataText,
                            { color: textMuted },
                          ]}
                        >
                          {item.data}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.itemValor,
                      {
                        color:
                          item.tipo === 'ganho'
                            ? '#00C853'
                            : '#EF4444',
                      },
                    ]}
                  >
                    {item.tipo === 'ganho' ? '+' : '-'} R$
                    {item.valor.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* MODAL DE AÇÕES (EDITAR / APAGAR) */}
      <Modal
        visible={!!registroSelecionado}
        transparent
        animationType="slide"
        onRequestClose={fecharOpcoes}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: textColor },
                ]}
              >
                Gerir Registo
              </Text>
              <TouchableOpacity
                onPress={fecharOpcoes}
                style={[
                  styles.btnModalClose,
                  {
                    backgroundColor: isDark
                      ? '#222'
                      : '#F5F5F5',
                  },
                ]}
              >
                <X size={20} color={textMuted} />
              </TouchableOpacity>
            </View>

            {/* Informação do Registo Selecionado */}
            {registroSelecionado && (
              <View
                style={{
                  marginBottom: 24,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: textMuted,
                    marginBottom: 4,
                  }}
                >
                  {registroSelecionado.categoria}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '900',
                    color:
                      registroSelecionado.tipo === 'ganho'
                        ? '#00C853'
                        : '#EF4444',
                  }}
                >
                  R$ {registroSelecionado.valor.toFixed(2)}
                </Text>
              </View>
            )}

            {/* Botão Editar */}
            <TouchableOpacity
              style={[
                styles.btnAcaoModal,
                {
                  backgroundColor: isDark
                    ? '#222'
                    : '#F5F5F5',
                  borderColor,
                },
              ]}
              onPress={editarRegistro}
            >
              <Edit3 size={22} color={textColor} />
              <Text
                style={[
                  styles.btnAcaoTexto,
                  { color: textColor },
                ]}
              >
                Editar Valor ou Data
              </Text>
            </TouchableOpacity>

            {/* Botão Apagar */}
            <TouchableOpacity
              style={[
                styles.btnAcaoModal,
                {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                },
              ]}
              onPress={deletarRegistro}
            >
              <Trash2 size={22} color="#EF4444" />
              <Text
                style={[
                  styles.btnAcaoTexto,
                  { color: '#EF4444' },
                ]}
              >
                Apagar Definitivamente
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE VEÍCULO */}
      <Modal
        visible={modalVeiculo}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVeiculo(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  color: textColor,
                  marginBottom: 16,
                  textAlign: 'center',
                },
              ]}
            >
              Filtrar por Veículo
            </Text>

            <TouchableOpacity
              style={[
                styles.btnAcaoModal,
                {
                  backgroundColor: isDark
                    ? '#222'
                    : '#F5F5F5',
                  borderColor:
                    veiculoFiltro === 'todos'
                      ? '#00C853'
                      : borderColor,
                },
              ]}
              onPress={() => {
                setVeiculoFiltro('todos');
                setModalVeiculo(false);
              }}
            >
              <Text
                style={[
                  styles.btnAcaoTexto,
                  { color: textColor },
                ]}
              >
                Todos os Veículos
              </Text>
            </TouchableOpacity>

            {veiculos.map((v) => (
              <TouchableOpacity
                key={v.id}
                style={[
                  styles.btnAcaoModal,
                  {
                    backgroundColor: isDark
                      ? '#222'
                      : '#F5F5F5',
                    borderColor:
                      veiculoFiltro === v.id
                        ? '#00C853'
                        : borderColor,
                  },
                ]}
                onPress={() => {
                  setVeiculoFiltro(v.id);
                  setModalVeiculo(false);
                }}
              >
                <Text
                  style={[
                    styles.btnAcaoTexto,
                    { color: textColor },
                  ]}
                >
                  {v.modelo} - {v.placa}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{
                padding: 16,
                alignItems: 'center',
                marginTop: 8,
              }}
              onPress={() => setModalVeiculo(false)}
            >
              <Text
                style={{
                  color: textMuted,
                  fontWeight: 'bold',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
