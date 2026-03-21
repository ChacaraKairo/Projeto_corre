import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  X,
  Bike,
  Motorbike,
  Car,
  Bus,
  Settings,
  Hash,
  Wrench,
  Gauge,
  Check,
} from 'lucide-react-native';
import { useTema } from '../../../hooks/modo_tema';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (veiculo: any) => Promise<void>;
}

export const ModalNovoVeiculo = ({
  visible,
  onClose,
  onSave,
}: Props) => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const [tipo, setTipo] = useState<
    'moto' | 'carro' | 'bicicleta' | 'van'
  >('moto');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [motor, setMotor] = useState('');
  const [placa, setPlaca] = useState('');
  const [kmAtual, setKmAtual] = useState('');

  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    const isBicicleta = tipo === 'bicicleta';
    if (
      !marca ||
      !modelo ||
      (!isBicicleta && (!placa || !kmAtual))
    ) {
      Alert.alert(
        'Erro',
        isBicicleta
          ? 'Por favor, preenche os campos obrigatórios: Marca e Modelo.'
          : 'Por favor, preenche os campos obrigatórios: Marca, Modelo, Placa e KM.',
      );
      return;
    }

    setSalvando(true);
    try {
      await onSave({
        tipo,
        marca,
        modelo,
        ano,
        motor,
        placa,
        km_atual: parseInt(kmAtual.replace(/\D/g, '')) || 0,
      });
      // Limpa os campos após salvar
      setTipo('moto');
      setMarca('');
      setModelo('');
      setAno('');
      setMotor('');
      setPlaca('');
      setKmAtual('');
    } catch (error) {
      console.error(error);
    } finally {
      setSalvando(false);
    }
  };

  const bgPrincipal = isDark ? '#0A0A0A' : '#F5F5F5';
  const bgCard = isDark ? '#161616' : '#FFFFFF';
  const borderColor = isDark ? '#222' : '#E0E0E0';
  const textPrimary = isDark ? '#FFF' : '#000';
  const textSecondary = isDark ? '#888' : '#555';
  const inputBg = isDark ? '#0A0A0A' : '#F5F5F5';

  const getPlaceholders = () => {
    switch (tipo) {
      case 'moto':
        return {
          marca: 'Ex: Honda',
          modelo: 'Ex: CG Titan',
          placa: 'ABC-1D23',
        };
      case 'carro':
        return {
          marca: 'Ex: Fiat',
          modelo: 'Ex: Toro',
          placa: 'ABC-1D23',
        };
      case 'bicicleta':
        return {
          marca: 'Ex: Caloi / Oggi',
          modelo: 'Ex: Vulcan',
          placa: '',
        };
      case 'van':
        return {
          marca: 'Ex: Mercedes',
          modelo: 'Ex: Sprinter',
          placa: 'ABC-1D23',
        };
      default:
        return {
          marca: 'Marca',
          modelo: 'Modelo',
          placa: 'Placa',
        };
    }
  };

  const placeholders = getPlaceholders();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }
      >
        <View style={styles.overlay}>
          <View
            style={[
              styles.container,
              { backgroundColor: bgPrincipal },
            ]}
          >
            {/* Header */}
            <View
              style={[
                styles.header,
                { borderBottomColor: borderColor },
              ]}
            >
              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.btnVoltar,
                  { backgroundColor: bgCard, borderColor },
                ]}
              >
                <X size={20} color={textSecondary} />
              </TouchableOpacity>
              <Text style={styles.title}>Nova Máquina</Text>
              <View style={{ width: 36 }} />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Seletor de Tipo */}
              <View style={styles.section}>
                <Text
                  style={[
                    styles.sectionLabel,
                    { color: textSecondary },
                  ]}
                >
                  Tipo de Veículo
                </Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => setTipo('moto')}
                    style={[
                      styles.btnTipo,
                      {
                        backgroundColor: bgCard,
                        borderColor,
                      },
                      tipo === 'moto' &&
                        styles.btnTipoAtivo,
                    ]}
                  >
                    <Motorbike
                      size={32}
                      color={
                        tipo === 'moto'
                          ? '#00C853'
                          : textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.txtTipo,
                        {
                          color:
                            tipo === 'moto'
                              ? '#00C853'
                              : textSecondary,
                        },
                      ]}
                    >
                      MOTO
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setTipo('carro')}
                    style={[
                      styles.btnTipo,
                      {
                        backgroundColor: bgCard,
                        borderColor,
                      },
                      tipo === 'carro' &&
                        styles.btnTipoAtivo,
                    ]}
                  >
                    <Car
                      size={32}
                      color={
                        tipo === 'carro'
                          ? '#00C853'
                          : textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.txtTipo,
                        {
                          color:
                            tipo === 'carro'
                              ? '#00C853'
                              : textSecondary,
                        },
                      ]}
                    >
                      CARRO
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[styles.row, { marginTop: 12 }]}
                >
                  <TouchableOpacity
                    onPress={() => setTipo('bicicleta')}
                    style={[
                      styles.btnTipo,
                      {
                        backgroundColor: bgCard,
                        borderColor,
                      },
                      tipo === 'bicicleta' &&
                        styles.btnTipoAtivo,
                    ]}
                  >
                    <Bike
                      size={32}
                      color={
                        tipo === 'bicicleta'
                          ? '#00C853'
                          : textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.txtTipo,
                        {
                          color:
                            tipo === 'bicicleta'
                              ? '#00C853'
                              : textSecondary,
                        },
                      ]}
                    >
                      BICICLETA
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setTipo('van')}
                    style={[
                      styles.btnTipo,
                      {
                        backgroundColor: bgCard,
                        borderColor,
                      },
                      tipo === 'van' && styles.btnTipoAtivo,
                    ]}
                  >
                    <Bus
                      size={32}
                      color={
                        tipo === 'van'
                          ? '#00C853'
                          : textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.txtTipo,
                        {
                          color:
                            tipo === 'van'
                              ? '#00C853'
                              : textSecondary,
                        },
                      ]}
                    >
                      VAN
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Identificação */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: bgCard, borderColor },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Settings size={18} color="#00C853" />
                  <Text
                    style={[
                      styles.cardTitle,
                      { color: textSecondary },
                    ]}
                  >
                    Identificação
                  </Text>
                </View>

                <View style={styles.row}>
                  <View style={styles.inputWrapper}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: textSecondary },
                      ]}
                    >
                      Marca
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: inputBg,
                          borderColor,
                          color: textPrimary,
                        },
                      ]}
                      placeholder={placeholders.marca}
                      placeholderTextColor={textSecondary}
                      value={marca}
                      onChangeText={setMarca}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: textSecondary },
                      ]}
                    >
                      Modelo
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: inputBg,
                          borderColor,
                          color: textPrimary,
                        },
                      ]}
                      placeholder={placeholders.modelo}
                      placeholderTextColor={textSecondary}
                      value={modelo}
                      onChangeText={setModelo}
                    />
                  </View>
                </View>

                {tipo !== 'bicicleta' && (
                  <View
                    style={[
                      styles.inputWrapper,
                      { marginTop: 12 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: textSecondary },
                      ]}
                    >
                      Placa
                    </Text>
                    <View style={styles.inputIconWrapper}>
                      <Hash
                        size={16}
                        color={textSecondary}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: inputBg,
                            borderColor,
                            color: textPrimary,
                            paddingLeft: 40,
                            textTransform: 'uppercase',
                          },
                        ]}
                        placeholder={placeholders.placa}
                        placeholderTextColor={textSecondary}
                        value={placa}
                        onChangeText={setPlaca}
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>
                )}
              </View>

              {/* Técnico e Consumo */}
              {tipo !== 'bicicleta' && (
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: bgCard,
                      borderColor,
                    },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <Wrench size={18} color="#00C853" />
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: textSecondary },
                      ]}
                    >
                      Estado Inicial
                    </Text>
                  </View>

                  <View style={styles.inputWrapper}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        marginBottom: 8,
                      }}
                    >
                      <Gauge
                        size={12}
                        color={textSecondary}
                      />
                      <Text
                        style={[
                          styles.inputLabel,
                          {
                            color: textSecondary,
                            marginBottom: 0,
                          },
                        ]}
                      >
                        Odómetro Atual (KM)
                      </Text>
                    </View>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: inputBg,
                          borderColor,
                          color: textPrimary,
                          fontSize: 20,
                          fontWeight: '900',
                        },
                      ]}
                      placeholder="0"
                      placeholderTextColor={textSecondary}
                      value={kmAtual}
                      onChangeText={setKmAtual}
                      keyboardType="numeric"
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: textSecondary,
                        marginTop: 4,
                      }}
                    >
                      Necessário para monitorizar revisões.
                    </Text>
                  </View>
                </View>
              )}

              {/* Botão Salvar */}
              <TouchableOpacity
                onPress={handleSalvar}
                disabled={salvando}
                style={[
                  styles.btnSave,
                  salvando && { opacity: 0.7 },
                ]}
              >
                {salvando ? (
                  <ActivityIndicator
                    size="small"
                    color="#0A0A0A"
                  />
                ) : (
                  <>
                    <Check
                      size={24}
                      color="#0A0A0A"
                      strokeWidth={3}
                    />
                    <Text style={styles.btnSaveText}>
                      ADICIONAR À GARAGEM
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  btnVoltar: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#00C853',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  scrollContent: { padding: 20 },
  section: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 8,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  btnTipo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
  },
  btnTipoAtivo: {
    borderColor: '#00C853',
    backgroundColor: 'rgba(0,200,83,0.1)',
  },
  txtTipo: {
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: 1,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  inputWrapper: { flex: 1, marginBottom: 12 },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    fontWeight: 'bold',
    borderWidth: 1,
  },
  inputIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: { position: 'absolute', left: 16, zIndex: 1 },
  btnSave: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 16,
    gap: 12,
    marginTop: 10,
  },
  btnSaveText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
