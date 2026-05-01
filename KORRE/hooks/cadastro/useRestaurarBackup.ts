import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { BackupRestoreService } from '../../services/BackupRestoreService';
import { logger } from '../../utils/logger';
import { showCustomAlert } from '../alert/useCustomAlert';

const mostrarAviso = (titulo: string, mensagem: string) => {
  Alert.alert(titulo, mensagem);
  showCustomAlert(titulo, mensagem);
};

export function useRestaurarBackup() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const executarRestauracao = async (data: unknown) => {
    setCarregando(true);

    try {
      await BackupRestoreService.restaurarBackup(data);

      Alert.alert(
        'Backup restaurado',
        'Dados restaurados. Bem-vindo de volta!',
        [
          {
            text: 'Ir para Dashboard',
            onPress: () => router.replace('/(tabs)/dashboard'),
          },
        ],
      );
    } catch (error) {
      logger.error('[RESTORE][FATAL]', error);
      mostrarAviso(
        'Erro na restauracao',
        'O arquivo de backup e invalido ou incompativel com o KORRE.',
      );
    } finally {
      setCarregando(false);
    }
  };

  const selecionarArquivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      if (!result.assets?.[0]?.uri) {
        mostrarAviso(
          'Backup nao selecionado',
          'Nao foi possivel acessar o arquivo escolhido.',
        );
        return;
      }

      const asset = result.assets[0];
      const conteudo = await FileSystem.readAsStringAsync(
        asset.uri,
      );

      if (!conteudo) {
        mostrarAviso(
          'Arquivo vazio',
          'O arquivo selecionado esta vazio.',
        );
        return;
      }

      let dados: unknown;
      try {
        dados = JSON.parse(conteudo);
      } catch (error) {
        logger.error('[PICKER] JSON invalido:', error);
        mostrarAviso(
          'Arquivo invalido',
          'O arquivo selecionado nao e um JSON valido. Escolha um backup exportado pelo KORRE.',
        );
        return;
      }

      Alert.alert(
        'Restaurar dados',
        `Deseja importar o backup "${asset.name}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sim, restaurar',
            onPress: () => {
              void executarRestauracao(dados);
            },
          },
        ],
      );
    } catch (error) {
      logger.error('[PICKER][ERRO CRITICO]', error);
      mostrarAviso(
        'Erro de leitura',
        'Nao foi possivel processar este arquivo. Verifique se e um JSON valido.',
      );
    }
  };

  return { selecionarArquivo, carregando };
}
