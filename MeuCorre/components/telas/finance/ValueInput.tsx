import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface ValueInputProps {
  valor: string;
  mainColor: string;
  inputRef: React.RefObject<TextInput | null>;
  onChangeText: (text: string) => void;
}

export const ValueInput = ({
  valor,
  mainColor,
  inputRef,
  onChangeText,
}: ValueInputProps) => (
  <View
    style={{
      alignItems: 'center',
      marginBottom: 32,
      width: '100%',
    }}
  >
    <Text
      style={{
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '900',
        color: '#888',
        letterSpacing: 2,
        marginBottom: 8,
      }}
    >
      Valor da Anotação
    </Text>
    <TouchableOpacity
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
      onPress={() => inputRef.current?.focus()}
      activeOpacity={1}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#666',
          marginRight: 4,
        }}
      >
        R$
      </Text>
      <Text
        style={{
          fontSize: 60,
          fontWeight: '900',
          color: mainColor,
          letterSpacing: -2,
        }}
      >
        {valor}
      </Text>
      <TextInput
        ref={inputRef}
        keyboardType="numeric"
        onChangeText={onChangeText}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          color: 'transparent',
        }}
        autoFocus
      />
    </TouchableOpacity>
  </View>
);
