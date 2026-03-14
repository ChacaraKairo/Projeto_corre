// Arquivo: src/components/telas/Cadastro/PerfilSecao.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { User, Camera, X, Lock } from 'lucide-react-native';
import { Input } from '../../ui/inputs/Input';
import { styles } from '../../../styles/telas/Cadastro/componentes/cadastroStyles';
import { PhotoService } from './script/photoService';

interface PerfilProps {
  nome: string;
  setNome: (t: string) => void;
  senha: string;
  setSenha: (t: string) => void;
  foto: string | null;
  setFoto: (uri: string | null) => void;
  erro: boolean;
}

export const PerfilSecao: React.FC<PerfilProps> = ({
  nome,
  setNome,
  senha,
  setSenha,
  foto,
  setFoto,
  erro,
}) => {
  const handleTakeAction = async () => {
    try {
      // Passamos a 'foto' atual para que o PhotoService possa excluir o arquivo antigo
      const savedUri = await PhotoService.takePhoto(foto);
      if (savedUri) {
        setFoto(savedUri);
      }
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message ||
          'Não foi possível capturar a foto.',
      );
    }
  };

  const handleRemovePhoto = async () => {
    // Opcional: Você pode chamar uma função no PhotoService para deletar o arquivo físico aqui também
    setFoto(null);
  };

  return (
    <View style={styles.card}>
      <View style={localStyles.sectionTitleRow}>
        <User size={18} color="#00C853" />
        <Text style={styles.labelSecao}>
          DADOS DO PILOTO
        </Text>
      </View>

      <View style={localStyles.photoContainer}>
        <TouchableOpacity
          style={localStyles.btnCamera}
          onPress={handleTakeAction}
        >
          <Camera size={24} color="#444" />
          <Text style={localStyles.btnCameraLabel}>
            FOTO
          </Text>
        </TouchableOpacity>

        <View style={localStyles.avatarWrapper}>
          <View style={localStyles.avatar}>
            {foto ? (
              <Image
                source={{ uri: foto }}
                style={localStyles.avatarImg}
                key={foto} // Força o refresh da imagem se o URI mudar
              />
            ) : (
              <User size={32} color="#252525" />
            )}
          </View>

          {foto && (
            <TouchableOpacity
              style={localStyles.btnRemovePhoto}
              onPress={handleRemovePhoto}
            >
              <X size={14} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Input
        label="Nome de Usuário"
        placeholder="Ex: João Silva"
        value={nome}
        onChangeText={setNome}
        Icone={User}
        erro={erro && nome.length < 3}
      />

      <Input
        label="Senha de Acesso"
        placeholder="••••••••"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        Icone={Lock}
        erro={erro && senha.length < 4}
      />
    </View>
  );
};

// ... (os localStyles permanecem os mesmos)
const localStyles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 10,
    marginBottom: 20,
  },
  btnCamera: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#202020',
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCameraLabel: {
    fontSize: 10,
    color: '#444',
    fontWeight: 'bold',
    marginTop: 4,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#00C853',
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  btnRemovePhoto: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#161616',
  },
});
