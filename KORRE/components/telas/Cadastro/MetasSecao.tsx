// Arquivo: src/components/telas/Cadastro/MetasSecao.tsx
// Componente: MetasSecao - Seleção de Meta Diária ou Semanal

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Target,
  Clock,
  CalendarDays,
} from 'lucide-react-native';
import { Input } from '../../ui/inputs/Input';
import { styles as cadastroStyles } from '../../../styles/telas/Cadastro/componentes/cadastroStyles';

import { localStyles } from '../../../styles/generated/components/telas/Cadastro/MetasSecaoStyles';
interface MetasSecaoProps {
  meta: string;
  setMeta: (t: string) => void;
  tipoMeta: 'diaria' | 'semanal';
  setTipoMeta: (t: 'diaria' | 'semanal') => void;
  erro: boolean;
}

/**
 * Este componente permite que o piloto escolha entre uma meta de faturamento
 * diária ou semanal, alterando os placeholders e ícones dinamicamente.
 */
export const MetasSecao: React.FC<MetasSecaoProps> = ({
  meta,
  setMeta,
  tipoMeta,
  setTipoMeta,
  erro,
}) => {
  const { t } = useTranslation();

  return (
    <View style={cadastroStyles.card}>
      <View style={localStyles.sectionTitleRow}>
        <Target size={18} color="#00C853" />
        <Text style={cadastroStyles.labelSecao}>
          {t('cadastro.metas_seguranca', 'METAS E SEGURANCA')}
        </Text>
      </View>

      {/* SELETOR DE PERÍODO (TOGGLE) */}
      <View style={localStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            localStyles.toggleBtn,
            tipoMeta === 'diaria' &&
              localStyles.toggleBtnActive,
          ]}
          onPress={() => setTipoMeta('diaria')}
          activeOpacity={0.8}
        >
          <Clock
            size={16}
            color={
              tipoMeta === 'diaria' ? '#0A0A0A' : '#666'
            }
          />
          <Text
            style={[
              localStyles.toggleText,
              tipoMeta === 'diaria' &&
                localStyles.toggleTextActive,
            ]}
          >
            {t('cadastro.diaria', 'Diaria')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            localStyles.toggleBtn,
            tipoMeta === 'semanal' &&
              localStyles.toggleBtnActive,
          ]}
          onPress={() => setTipoMeta('semanal')}
          activeOpacity={0.8}
        >
          <CalendarDays
            size={16}
            color={
              tipoMeta === 'semanal' ? '#0A0A0A' : '#666'
            }
          />
          <Text
            style={[
              localStyles.toggleText,
              tipoMeta === 'semanal' &&
                localStyles.toggleTextActive,
            ]}
          >
            {t('cadastro.semanal', 'Semanal')}
          </Text>
        </TouchableOpacity>
      </View>

      <Input
        label={
          tipoMeta === 'diaria'
            ? t('cadastro.meta_diaria', 'Meta diaria (R$)')
            : t('cadastro.meta_semanal', 'Meta semanal (R$)')
        }
        placeholder={
          tipoMeta === 'diaria'
            ? 'Ex: 150.00'
            : 'Ex: 800.00'
        }
        value={meta}
        onChangeText={setMeta}
        keyboardType="numeric"
        Icone={tipoMeta === 'diaria' ? Clock : CalendarDays}
        erro={erro && !meta}
      />

      <Text style={localStyles.obsText}>
        {tipoMeta === 'diaria'
          ? t('cadastro.meta_diaria_obs', '* Esta meta sera usada para calcular o seu progresso diario.')
          : t('cadastro.meta_semanal_obs', '* A meta semanal ajuda no planejamento financeiro de longo prazo.')}
      </Text>
    </View>
  );
};


