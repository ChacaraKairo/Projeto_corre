import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CategoryGridProps {
  categorias: Array<{
    id: string;
    icon: any;
    nome?: string;
  }>;
  categoriaSelecionada: string;
  onSelect: (id: string) => void;
  mainColor: string;
}

export const CategoryGrid = ({
  categorias,
  categoriaSelecionada,
  onSelect,
  mainColor,
}: CategoryGridProps) => (
  <View style={{ width: '100%', gap: 12 }}>
    <Text
      style={{
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '900',
        color: '#888',
        letterSpacing: 2,
        textAlign: 'center',
      }}
    >
      Selecionar Categoria
    </Text>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      {categorias.map((cat) => {
        const Icon = cat.icon;
        const isSelected = categoriaSelecionada === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={{
              width: '30%',
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: isSelected ? mainColor : '#333',
              backgroundColor: isSelected
                ? 'rgba(255,255,255,0.05)'
                : 'transparent',
            }}
          >
            <Icon
              size={24}
              color={isSelected ? mainColor : '#666'}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 9,
                fontWeight: '900',
                textTransform: 'uppercase',
                marginTop: 8,
                letterSpacing: -0.5,
                color: isSelected ? mainColor : '#666',
              }}
            >
              {cat.nome || cat.id}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);
