import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  X,
  Trash2,
  Save,
  Bike,
  Car,
} from 'lucide-react-native';
import { useEditarPerfil } from '../../../hooks/perfil_user/useEditarPerfil';
import { useTema } from '../../../hooks/modo_tema';
import { styles } from '../../../styles/telas/Perfil/perfilStyles'; import { inlineStyles } from '../../../styles/generated-inline/components/telas/Perfil/ModalEditarPerfilInlineStyles';
import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/Perfil/ModalEditarPerfilDynamicStyles';
// Usando os teus estilos base

interface Props {
  visivel: boolean;
  onClose: () => void;
  onSalvoSucesso: () => void; // Função para atualizar a tela de trás quando salvar
}

export const ModalEditarPerfil = ({
  visivel,
  onClose,
  onSalvoSucesso,
}: Props) => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  const {
    nome,
    setNome,
    senha,
    setSenha,
    tipoMeta,
    setTipoMeta,
    veiculos,
    loading,
    salvarDados,
    apagarVeiculo,
  } = useEditarPerfil(visivel, onClose, onSalvoSucesso);

  const bgColor = isDark ? '#161616' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#0A0A0A';
  const borderColor = isDark ? '#333' : '#E0E0E0';
  const inputBg = isDark ? '#0A0A0A' : '#F5F5F5';

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
    >
      <View
        style={inlineStyles.inline1}
      >
        <View
          style={dynamicInlineStyles.inline1({ bgColor })}
        >
          {/* Header do Modal */}
          <View
            style={inlineStyles.inline2}
          >
            <Text
              style={dynamicInlineStyles.inline2({ textColor })}
            >
              Editar Dados
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={dynamicInlineStyles.inline3({ inputBg })}
            >
              <X
                size={20}
                color={isDark ? '#FFF' : '#000'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Secção: Dados Pessoais */}
            <Text
              style={inlineStyles.inline3}
            >
              Dados Pessoais
            </Text>
            <TextInput
              style={dynamicInlineStyles.inline4({ inputBg, textColor, borderColor })}
              value={nome}
              onChangeText={setNome}
              placeholder="O teu nome"
              placeholderTextColor="#666"
            />
            <TextInput
              style={dynamicInlineStyles.inline5({ inputBg, textColor, borderColor })}
              value={senha}
              onChangeText={setSenha}
              placeholder="Nova senha (opcional)"
              placeholderTextColor="#666"
              secureTextEntry
            />

            {/* Secção: Tipo de Meta */}
            <Text
              style={inlineStyles.inline4}
            >
              Tipo de Meta Financeira
            </Text>
            <View
              style={dynamicInlineStyles.inline6({ inputBg, borderColor })}
            >
              <TouchableOpacity
                onPress={() => setTipoMeta('diaria')}
                style={dynamicInlineStyles.inline7({ tipoMeta })}
              >
                <Text
                  style={dynamicInlineStyles.inline8({ tipoMeta })}
                >
                  Diária
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTipoMeta('semanal')}
                style={dynamicInlineStyles.inline9({ tipoMeta })}
              >
                <Text
                  style={dynamicInlineStyles.inline10({ tipoMeta })}
                >
                  Semanal
                </Text>
              </TouchableOpacity>
            </View>

            {/* Secção: Gerir Veículos */}
            <Text
              style={inlineStyles.inline5}
            >
              Gerir Veículos
            </Text>
            {veiculos.length === 0 ? (
              <Text
                style={inlineStyles.inline6}
              >
                Nenhum veículo cadastrado.
              </Text>
            ) : (
              veiculos.map((v) => (
                <View
                  key={v.id}
                  style={dynamicInlineStyles.inline11({ inputBg, borderColor })}
                >
                  <View
                    style={inlineStyles.inline7}
                  >
                    {v.tipo === 'carro' ? (
                      <Car size={20} color={textColor} />
                    ) : (
                      <Bike size={20} color={textColor} />
                    )}
                    <View>
                      <Text
                        style={dynamicInlineStyles.inline12({ textColor })}
                      >
                        {v.modelo}
                      </Text>
                      <Text
                        style={inlineStyles.inline8}
                      >
                        {v.placa}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      apagarVeiculo(v.id, v.modelo)
                    }
                    style={inlineStyles.inline9}
                  >
                    <Trash2 size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          {/* Botão Salvar */}
          <TouchableOpacity
            onPress={salvarDados}
            disabled={loading}
            style={dynamicInlineStyles.inline13({ loading })}
          >
            {loading ? (
              <ActivityIndicator color="#0A0A0A" />
            ) : (
              <Save size={20} color="#0A0A0A" />
            )}
            <Text
              style={inlineStyles.inline10}
            >
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
