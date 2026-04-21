import {
  FileText,
  Landmark,
  MapPin,
  Shield,
  Smartphone,
  Wifi,
} from 'lucide-react-native';
import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from '../../../../hooks/modo_tema';
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
  onCalcularIPVA: () => void;
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

    return (
      <AccordionSection
        title="Custos de Existência (Tempo)"
        icon={<Landmark size={20} color="#00C853" />}
        isComplete={isComplete}
        onHelpClick={() =>
          onHelp(
            'Custos de Existência',
            'Custos fixos. Eles definem quanto você perde com o carro parado.',
          )
        }
      >
        <View style={{ gap: 12 }}>
          {/* 1. IMPOSTOS E TAXAS */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <InputFinanceiro
                label="IPVA Anual"
                value={String(form.ipva_anual || '')}
                onChangeText={(v) =>
                  onChange('ipva_anual', v)
                }
                placeholder="R$ 0,00"
                icon={<FileText size={18} color="#666" />}
                suffix="R$"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.autoButton,
                {
                  backgroundColor: isDark
                    ? '#1A1A1A'
                    : '#F0F0F0',
                },
              ]}
              onPress={onCalcularIPVA}
            >
              <MapPin size={16} color="#00C853" />
              <Text
                style={[
                  styles.autoButtonText,
                  { color: isDark ? '#FFF' : '#333' },
                ]}
              >
                AUTO ({form.estado_uf || 'SP'})
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
            icon={<FileText size={18} color="#666" />}
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
            icon={<Shield size={18} color="#666" />}
            suffix="R$/Ano"
          />

          <InputFinanceiro
            label="Plano de Dados (Internet)"
            value={String(form.plano_dados_mensal || '')}
            onChangeText={(v) =>
              onChange('plano_dados_mensal', v)
            }
            placeholder="R$ 0,00"
            icon={<Wifi size={18} color="#666" />}
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
            icon={<Smartphone size={18} color="#666" />}
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
            icon={<Landmark size={18} color="#666" />}
            suffix="Meses"
          />
        </View>
      </AccordionSection>
    );
  },
);

const styles = StyleSheet.create({
  // ... Mantenha exatamente os mesmos estilos que você já tinha na SecaoCustosExistencia
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  autoButton: {
    height: 52,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#00C853',
    marginBottom: 0,
  },
  autoButtonText: { fontSize: 11, fontWeight: 'bold' },
});
