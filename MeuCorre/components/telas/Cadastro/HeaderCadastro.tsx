// Arquivo: src/components/telas/Cadastro/HeaderCadastro.tsx
// Componente: HeaderCadastro com ícone dinâmico e animação

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bike, Car } from 'lucide-react-native';

interface HeaderProps {
  tipoVeiculo: 'moto' | 'carro' | 'bicicleta' | 'van';
}

export const HeaderCadastro: React.FC<HeaderProps> = ({
  tipoVeiculo,
}) => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.iconContainer}>
        {tipoVeiculo === 'moto' ||
        tipoVeiculo === 'bicicleta' ? (
          <Bike
            size={40}
            color="#0A0A0A"
            strokeWidth={2.5}
          />
        ) : (
          <Car
            size={40}
            color="#0A0A0A"
            strokeWidth={2.5}
          />
        )}
      </View>
      <Text style={headerStyles.titulo}>MeuCorre</Text>
      <Text style={headerStyles.subtitulo}>
        Configura a tua conta e começa a rodar.
      </Text>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 25,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
