import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface FinanceHeaderProps {
  tipo: string;
  mainColor: string;
  onCancel: () => void;
}

export const FinanceHeader = ({
  tipo,
  mainColor,
  onCancel,
}: FinanceHeaderProps) => {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 24,
        paddingTop: 50, // Espaço para a status bar do telemóvel
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#121212',
        zIndex: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: -1,
          color: 'white',
        }}
      >
        Anotar{' '}
        <Text style={{ color: mainColor }}>
          {tipo === 'ganho' ? 'Ganho' : 'Despesa'}
        </Text>
      </Text>
      <TouchableOpacity
        onPress={() => router.back()} // Volta para o Dashboard
        style={{
          padding: 8,
          backgroundColor: '#202020',
          borderRadius: 12,
        }}
      >
        <Text style={{ color: '#888', fontWeight: 'bold' }}>
          X
        </Text>
      </TouchableOpacity>
    </View>
  );
};
