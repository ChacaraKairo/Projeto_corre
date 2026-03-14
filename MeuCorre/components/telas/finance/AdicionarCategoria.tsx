import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Briefcase,
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Zap,
  ShoppingBag,
  Coffee,
  Wrench,
  Fuel,
  Tag,
  Home,
  Music,
} from 'lucide-react-native';

const IconComponents: any = {
  Smartphone,
  Car,
  Navigation,
  Package,
  Truck,
  Briefcase,
  Zap,
  ShoppingBag,
  Coffee,
  Wrench,
  Fuel,
  Tag,
  Home,
  Music,
};
const iconList = Object.keys(IconComponents);

interface AdicionarCategoriaProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  nome: string;
  setNome: (nome: string) => void;
  icone: string;
  setIcone: (icone: string) => void;
  mainColor: string;
}

export const AdicionarCategoria = ({
  visible,
  onClose,
  onSave,
  nome,
  setNome,
  icone,
  setIcone,
  mainColor,
}: AdicionarCategoriaProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Nova Categoria</Text>

          <Text style={styles.label}>
            NOME DA CATEGORIA
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: mainColor },
            ]}
            placeholder="Ex: Refeição, Gorjeta..."
            placeholderTextColor="#666"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>ESCOLHER ÍCONE</Text>
          <View style={styles.iconGrid}>
            {iconList.map((ico) => {
              const Icon = IconComponents[ico];
              return (
                <TouchableOpacity
                  key={ico}
                  style={[
                    styles.iconOption,
                    icone === ico && {
                      borderColor: mainColor,
                      backgroundColor: `${mainColor}20`,
                    },
                  ]}
                  onPress={() => setIcone(ico)}
                >
                  <Icon
                    size={20}
                    color={
                      icone === ico ? mainColor : '#666'
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.btnCancel}
            >
              <Text style={styles.btnCancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              style={[
                styles.btnSave,
                {
                  backgroundColor: mainColor,
                  opacity: nome.trim() ? 1 : 0.5,
                },
              ]}
              disabled={!nome.trim()}
            >
              <Text style={styles.btnSaveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#888',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderRadius: 12,
    color: '#FFF',
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  btnCancelText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnSave: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSaveText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0A0A0A',
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
