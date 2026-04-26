import {
  FileText,
  Landmark,
  MapPin,
  Shield,
  Smartphone,
  Wifi,
  X,
} from 'lucide-react-native';
import React, { memo, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';
import { palette } from '../../../../styles/tokens';
import { secaoCustosExistenciaStyles as styles } from '../../../../styles/telas/Calculadora/sections/secaoCustosExistenciaStyles';
import { sharedSectionStyles } from '../../../../styles/telas/Calculadora/sections/sharedSectionStyles';
import {
  REGRAS_IPVA_ESTADOS,
  SiglaEstado,
} from '../../../../type/ipvaEstados';
import { FormularioViabilidade } from '../../../../type/viabilidadeCorrida'; // SSOT
import { AccordionSection } from '../ui/AccordionSection';
import { InputFinanceiro } from '../ui/InputFinanceiro';

interface SecaoCustosExistenciaProps {
  form: Partial<FormularioViabilidade>;
  onChange: (
    campo: keyof FormularioViabilidade,
    valor: string,
  ) => void;
  onHelp: (titulo: string, texto: string) => void;
  onCalcularIPVA: (ufSelecionada?: SiglaEstado) => void; // <-- Permite receber a UF
  isComplete: boolean;
}

export const SecaoCustosExistencia = memo(
  ({
    form,
    onChange,
    onHelp,
    onCalcularIPVA,
    isComplete,
  }: SecaoCustosExistenciaProps) => {
    const { tema } = useTema();
    const isDark = tema === 'escuro';

    // Estado local para controlar a visibilidade do modal de seleção de estado
    const [modalUFVisivel, setModalUFVisivel] =
      useState(false);

    // Extrai as siglas do seu Map de regras para montar a lista do Modal automaticamente
    const listaEstados = Object.keys(
      REGRAS_IPVA_ESTADOS,
    ) as SiglaEstado[];

    // Função disparada ao clicar numa UF dentro do modal
    const handleSelecionarUF = (uf: SiglaEstado) => {
      setModalUFVisivel(false);
      onCalcularIPVA(uf); // Calcula e atualiza imediatamente!
    };

    return (
      <>
        <AccordionSection
          title="Custos de Existência (Tempo)"
          icon={<Landmark size={20} color={palette.brand} />}
          isComplete={isComplete}
          onHelpClick={() =>
            onHelp(
              'Custos de Existência',
              'Custos fixos. Eles definem quanto você perde com o carro parado.',
            )
          }
        >
          <View style={sharedSectionStyles.fieldStack}>
            {/* 1. IMPOSTOS E TAXAS */}
            <View style={styles.row}>
              <View style={sharedSectionStyles.flex1}>
                <InputFinanceiro
                  label="IPVA Anual"
                  value={String(form.ipva_anual || '')}
                  onChangeText={(v) =>
                    onChange('ipva_anual', v)
                  }
                  placeholder="R$ 0,00"
                  icon={<FileText size={18} color={palette.surface400} />}
                  suffix="R$"
                />
              </View>
              {/* Botão que agora abre o Modal */}
              <TouchableOpacity
                style={[
                  styles.autoButton,
                  {
                    backgroundColor: isDark
                      ? palette.surface750
                      : palette.surface100,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setModalUFVisivel(true)}
              >
                <MapPin size={16} color={palette.brand} />
                <Text
                  style={[
                    styles.autoButtonText,
                    { color: isDark ? palette.white : palette.surface600 },
                  ]}
                >
                  CALCULAR ({form.estado_uf || 'SP'}) ▾
                </Text>
              </TouchableOpacity>
            </View>

            <InputFinanceiro
              label="Licenciamento / DPVAT"
              value={String(
                form.licenciamento_detran_anual || '',
              )}
              onChangeText={(v) =>
                onChange('licenciamento_detran_anual', v)
              }
              placeholder="R$ 0,00"
              icon={<FileText size={18} color={palette.surface400} />}
              suffix="R$/Ano"
            />

            {/* 2. PROTEÇÃO E CONECTIVIDADE */}
            <InputFinanceiro
              label="Seguro Comercial / APP"
              value={String(
                form.seguro_comercial_anual || '',
              )}
              onChangeText={(v) =>
                onChange('seguro_comercial_anual', v)
              }
              placeholder="R$ 0,00"
              icon={<Shield size={18} color={palette.surface400} />}
              suffix="R$/Ano"
            />

            <InputFinanceiro
              label="Plano de Dados (Internet)"
              value={String(form.plano_dados_mensal || '')}
              onChangeText={(v) =>
                onChange('plano_dados_mensal', v)
              }
              placeholder="R$ 0,00"
              icon={<Wifi size={18} color={palette.surface400} />}
              suffix="R$/Mês"
            />

            {/* 3. EQUIPAMENTO DE TRABALHO */}
            <InputFinanceiro
              label="Custo do Smartphone"
              value={String(form.valor_smartphone || '')}
              onChangeText={(v) =>
                onChange('valor_smartphone', v)
              }
              placeholder="R$ 0,00"
              icon={<Smartphone size={18} color={palette.surface400} />}
              suffix="R$"
            />

            <InputFinanceiro
              label="Vida Útil (Meses)"
              value={String(
                form.vida_util_smartphone_meses || '',
              )}
              onChangeText={(v) =>
                onChange('vida_util_smartphone_meses', v)
              }
              placeholder="Ex: 24"
              icon={<Landmark size={18} color={palette.surface400} />}
              suffix="Meses"
            />
          </View>
        </AccordionSection>

        {/* Modal de Seleção de Estado (Renderizado fora da Accordion para evitar cortes de layout) */}
        <Modal
          visible={modalUFVisivel}
          transparent
          animationType="fade"
          onRequestClose={() => setModalUFVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: isDark
                    ? palette.surface700
                    : palette.white,
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text
                  style={[
                    styles.modalTitle,
                    { color: isDark ? palette.white : palette.surface600 },
                  ]}
                >
                  Selecione o Estado
                </Text>
                <TouchableOpacity
                  onPress={() => setModalUFVisivel(false)}
                >
                  <X size={24} color={palette.surface300} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={listaEstados}
                keyExtractor={(item) => item}
                numColumns={4}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.ufButton,
                      {
                        backgroundColor:
                          form.estado_uf === item
                            ? palette.brand
                            : isDark
                              ? palette.surface600
                              : palette.surface100,
                      },
                    ]}
                    onPress={() => handleSelecionarUF(item)}
                  >
                    <Text
                      style={[
                        styles.ufButtonText,
                        {
                          color:
                            form.estado_uf === item
                              ? palette.white
                              : isDark
                                ? palette.surface200
                                : palette.surface500,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  },
);

SecaoCustosExistencia.displayName =
  'SecaoCustosExistencia';
