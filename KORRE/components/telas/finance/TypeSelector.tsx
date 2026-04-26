import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { inlineStyles } from '../../../styles/generated-inline/components/telas/finance/TypeSelectorInlineStyles';
import { dynamicInlineStyles } from '../../../styles/generated-dynamic/components/telas/finance/TypeSelectorDynamicStyles';
interface TypeSelectorProps {
  tipo: 'ganho' | 'despesa';
  setTipo: (tipo: 'ganho' | 'despesa') => void;
}

export const TypeSelector = ({
  tipo,
  setTipo,
}: TypeSelectorProps) => (
  <View style={inlineStyles.inline1}>
    <View
      style={inlineStyles.inline2}
    >
      <TouchableOpacity
        onPress={() => setTipo('ganho')}
        style={dynamicInlineStyles.inline1({ tipo })}
      >
        <Text
          style={dynamicInlineStyles.inline2({ tipo })}
        >
          Entrada (+)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTipo('despesa')}
        style={dynamicInlineStyles.inline3({ tipo })}
      >
        <Text
          style={dynamicInlineStyles.inline4({ tipo })}
        >
          Saída (-)
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
