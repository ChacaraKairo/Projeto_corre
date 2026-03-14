import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Check,
} from 'lucide-react-native';

// Importação do Hook e Estilos
import { useFinance } from '../../hooks/finance/useFinance';
import { styles } from '../../styles/telas/Finance/AddTransactionStyles';

// Importação dos Sub-componentes
import { FinanceHeader } from '../../components/telas/finance/FinanceHeader';
import { ValueInput } from '../../components/telas/finance/ValueInput';
import { CategoryGrid } from '../../components/telas/finance/CategoryGrid';
import { SuccessOverlay } from '../../components/telas/finance/SuccessOverlay';
import { AdicionarCategoria } from '../../components/telas/finance/AdicionarCategoria';

export default function AddTransactionScreen() {
  // Hook Personalizado
  const {
    tipo,
    setTipo,
    valor,
    valorNumerico,
    handleValueChange,
    categoriaSelecionada,
    setCategoriaSelecionada,
    showSuccess,
    allVehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    categorias,
    mainColor,
    inputRef,
    handleSave,
    router,
    modalCategoriaAberto,
    setModalCategoriaAberto,
    novaCategoriaNome,
    setNovaCategoriaNome,
    novaCategoriaIcone,
    setNovaCategoriaIcone,
    handleAddCategoria,
  } = useFinance();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <FinanceHeader
        tipo={tipo}
        mainColor={mainColor}
        onCancel={() => router.back()}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Seletor de Tipo (Ganho / Despesa) */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor:
                  tipo === 'ganho'
                    ? 'rgba(0, 200, 83, 0.1)'
                    : '#1A1A1A',
                borderWidth: 1,
                borderColor:
                  tipo === 'ganho' ? '#00C853' : '#333',
                borderRadius: 16,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onPress={() => setTipo('ganho')}
              activeOpacity={0.7}
            >
              <TrendingUp
                size={20}
                color={
                  tipo === 'ganho' ? '#00C853' : '#666'
                }
              />
              <Text
                style={{
                  color:
                    tipo === 'ganho' ? '#00C853' : '#666',
                  fontWeight: 'bold',
                }}
              >
                GANHO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor:
                  tipo === 'despesa'
                    ? 'rgba(244, 67, 54, 0.1)'
                    : '#1A1A1A',
                borderWidth: 1,
                borderColor:
                  tipo === 'despesa' ? '#F44336' : '#333',
                borderRadius: 16,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onPress={() => setTipo('despesa')}
              activeOpacity={0.7}
            >
              <TrendingDown
                size={20}
                color={
                  tipo === 'despesa' ? '#F44336' : '#666'
                }
              />
              <Text
                style={{
                  color:
                    tipo === 'despesa' ? '#F44336' : '#666',
                  fontWeight: 'bold',
                }}
              >
                DESPESA
              </Text>
            </TouchableOpacity>
          </View>

          <ValueInput
            valor={valor}
            mainColor={mainColor}
            inputRef={inputRef}
            onChangeText={handleValueChange}
          />

          {/* Seletor de Veículo */}
          <View style={{ marginBottom: 32, width: '100%' }}>
            <Text
              style={{
                color: '#888',
                fontSize: 10,
                textTransform: 'uppercase',
                fontWeight: '900',
                letterSpacing: 2,
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Vincular ao Veículo
            </Text>
            <View style={{ height: 50 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                {allVehicles.map((v) => (
                  <TouchableOpacity
                    key={v.id}
                    onPress={() =>
                      setSelectedVehicleId(v.id)
                    }
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      backgroundColor:
                        selectedVehicleId === v.id
                          ? mainColor
                          : '#1A1A1A',
                      borderWidth: 1,
                      borderColor:
                        selectedVehicleId === v.id
                          ? mainColor
                          : '#333',
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          selectedVehicleId === v.id
                            ? '#0A0A0A'
                            : '#888',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}
                    >
                      {v.modelo.toUpperCase()}
                      {v.placa ? ` - ${v.placa}` : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <CategoryGrid
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onSelect={setCategoriaSelecionada}
            mainColor={mainColor}
          />

          {/* Botão de Adicionar Nova Categoria */}
          <TouchableOpacity
            style={{
              marginTop: 24,
              alignItems: 'center',
            }}
            onPress={() => setModalCategoriaAberto(true)}
          >
            <Text
              style={{
                color: mainColor,
                fontWeight: 'bold',
                fontSize: 12,
              }}
            >
              + ADICIONAR NOVA CATEGORIA
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={
            valorNumerico <= 0 ||
            !categoriaSelecionada ||
            showSuccess
          }
          style={[
            styles.btnSalvar,
            valorNumerico > 0 && categoriaSelecionada
              ? { backgroundColor: mainColor }
              : styles.btnSalvarDisabled,
          ]}
          onPress={handleSave}
        >
          {showSuccess ? (
            <Check size={28} color="#FFF" />
          ) : (
            <TrendingUp
              size={24}
              color={tipo === 'ganho' ? '#0A0A0A' : '#FFF'}
            />
          )}
          <Text
            style={[
              styles.btnSalvarText,
              {
                color:
                  tipo === 'ganho' &&
                  valorNumerico > 0 &&
                  categoriaSelecionada
                    ? '#0A0A0A'
                    : '#FFF',
              },
            ]}
          >
            {showSuccess ? 'SALVO!' : 'SALVAR ANOTAÇÃO'}
          </Text>
        </TouchableOpacity>
      </View>

      {showSuccess && (
        <SuccessOverlay mainColor={mainColor} />
      )}

      <AdicionarCategoria
        visible={modalCategoriaAberto}
        onClose={() => setModalCategoriaAberto(false)}
        onSave={handleAddCategoria}
        nome={novaCategoriaNome}
        setNome={setNovaCategoriaNome}
        icone={novaCategoriaIcone}
        setIcone={setNovaCategoriaIcone}
        mainColor={mainColor}
      />
    </KeyboardAvoidingView>
  );
}
