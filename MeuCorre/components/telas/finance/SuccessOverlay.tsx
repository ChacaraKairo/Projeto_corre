import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface SuccessOverlayProps {
  mainColor: string;
}

export const SuccessOverlay = ({
  mainColor,
}: SuccessOverlayProps) => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      },
    ]}
  >
    <View
      style={{
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: mainColor,
        elevation: 10,
        shadowColor: mainColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      }}
    >
      <Check size={48} color="white" strokeWidth={4} />
    </View>
    <Text
      style={{
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.5,
        color: 'white',
      }}
    >
      ANOTAÇÃO FEITA!
    </Text>
    <Text style={{ color: '#9CA3AF', marginTop: 8 }}>
      Atualizando seu lucro...
    </Text>
  </View>
);
