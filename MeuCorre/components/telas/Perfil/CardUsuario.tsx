import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera, User, Pencil } from 'lucide-react-native';
import { styles } from '../../../styles/telas/Perfil/perfilStyles';
import { useTema } from '../../../hooks/modo_tema';

interface Props {
  usuario: any;
  onEditPress: () => void;
}

export const CardUsuario = ({
  usuario,
  onEditPress,
}: Props) => {
  const { tema } = useTema();
  const isDark = tema === 'escuro';

  return (
    <View
      style={[
        styles.cardPerfil,
        {
          backgroundColor: isDark ? '#161616' : '#FFFFFF',
          borderColor: isDark ? '#222' : '#E0E0E0',
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: isDark
                ? '#0A0A0A'
                : '#F5F5F5',
            },
          ]}
        >
          {usuario?.foto_uri ? (
            <Image
              source={{ uri: usuario.foto_uri }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 48,
              }}
            />
          ) : (
            <User
              size={40}
              color={isDark ? '#666' : '#999'}
            />
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.avatarBadge,
            { backgroundColor: '#00C853' },
          ]}
        >
          <Camera
            size={14}
            color="#0A0A0A"
            strokeWidth={3}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.nomeUsuario,
          { color: isDark ? '#FFFFFF' : '#000000' },
        ]}
      >
        {usuario?.nome || 'Piloto'}
      </Text>
      <View style={styles.tagEntregador}>
        <Text style={styles.tagTexto}>
          Entregador Parceiro
        </Text>
      </View>

      <TouchableOpacity
        style={styles.btnEditarPerfil}
        onPress={onEditPress}
      >
        <Pencil size={14} color="#00C853" />
        <Text style={styles.btnEditarTexto}>
          Editar Dados
        </Text>
      </TouchableOpacity>
    </View>
  );
};
