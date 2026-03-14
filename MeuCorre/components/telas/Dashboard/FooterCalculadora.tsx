import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fuel, ChevronRight } from 'lucide-react-native';
import { dashboardStyles as styles } from '../../../styles/telas/Dashboard/dashboardStyles';

export const FooterCalculadora = ({
  onPress,
}: {
  onPress: () => void;
}) => (
  <View style={styles.footerFixo}>
    <TouchableOpacity
      style={styles.btnCalculadora}
      onPress={onPress}
    >
      <Fuel size={24} color="#0A0A0A" />
      <Text style={styles.btnCalculadoraTexto}>
        Calculadora Flex
      </Text>
      <ChevronRight size={20} color="#0A0A0A" />
    </TouchableOpacity>
  </View>
);
