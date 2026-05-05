import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { styles } from '../../../styles/telas/OrigemGanhos/OrigemGanhosStyles';
interface HeaderOrigemProps {
  busca: string;
  setBusca: (t: string) => void;
}

export const HeaderOrigem: React.FC<HeaderOrigemProps> = ({
  busca,
  setBusca,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.title}>
            {t('origem_ganhos.titulo', 'Configura o teu corre')}
          </Text>
          <Text style={styles.subtitle}>
            {t('origem_ganhos.subtitulo', 'Onde ganhas o teu dinheiro?')}
          </Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Search size={18} color="#444" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('origem_ganhos.buscar')}
          placeholderTextColor="#444"
          value={busca}
          onChangeText={setBusca}
        />
      </View>
    </View>
  );
};
