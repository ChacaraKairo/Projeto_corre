import { Alert } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useRouter } from 'expo-router';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import { BACKUP_TABLES } from '../../constants/backupSchema';
import { BackupRestoreService } from '../../services/BackupRestoreService';
import { logger } from '../../utils/logger';
import {
  hideAppLoading,
  showAppLoadingAsync,
} from '../ui/useAppLoading';

const mostrarErroBackup = (titulo: string, mensagem: string) => {
  Alert.alert(titulo, mensagem);
  showCustomAlert(titulo, mensagem);
};

export function useGerenciarDados() {
  const router = useRouter();
  const [importandoBackup, setImportandoBackup] =
    useState(false);

  const executarRestauracao = async (data: unknown) => {
    setImportandoBackup(true);
    await showAppLoadingAsync('Restaurando backup...');

    try {
      await BackupRestoreService.restaurarBackup(data, {
        onProgress: showAppLoadingAsync,
      });

      hideAppLoading();
      Alert.alert(
        'Backup restaurado',
        'Backup restaurado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/dashboard'),
          },
        ],
      );
    } catch (error) {
      logger.error('[Backup] Falha ao restaurar:', error);
      hideAppLoading();
      mostrarErroBackup(
        'Falha ao restaurar backup',
        'O arquivo selecionado nao pode ser restaurado. Verifique se ele e um backup JSON valido do KORRE.',
      );
    } finally {
      hideAppLoading();
      setImportandoBackup(false);
    }
  };

  const importarBackup = async () => {
    if (importandoBackup) return;

    try {
      await showAppLoadingAsync('Selecionando backup...');
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });
      hideAppLoading();

      if (res.canceled) return;

      if (!res.assets?.[0]?.uri) {
        mostrarErroBackup(
          'Backup nao selecionado',
          'Nao foi possivel acessar o arquivo escolhido.',
        );
        return;
      }

      await showAppLoadingAsync('Lendo backup...');
      const content = await FileSystem.readAsStringAsync(
        res.assets[0].uri,
      );
      hideAppLoading();

      let payload: unknown;
      try {
        payload = JSON.parse(content);
      } catch (error) {
        logger.error('[Backup] JSON invalido:', error);
        mostrarErroBackup(
          'Arquivo invalido',
          'O arquivo selecionado nao e um JSON valido. Escolha um backup exportado pelo KORRE.',
        );
        return;
      }

      await executarRestauracao(payload);
    } catch (error) {
      hideAppLoading();
      logger.error('[Backup] Falha ao ler arquivo:', error);
      mostrarErroBackup(
        'Falha ao ler backup',
        'Nao foi possivel abrir o arquivo selecionado. Tente escolher outro arquivo JSON.',
      );
    }
  };

  const limparTodosOsDados = () => {
    Alert.alert(
      'Limpar tudo?',
      'Isto apagara permanentemente seu perfil e historico.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar Tudo',
          style: 'destructive',
          onPress: async () => {
            try {
              await showAppLoadingAsync('Limpando dados...');
              await db.execAsync('PRAGMA foreign_keys = OFF;');

              for (const tabela of [...BACKUP_TABLES].reverse()) {
                await db.execAsync(`DELETE FROM ${tabela};`);
              }

              await db.execAsync('PRAGMA foreign_keys = ON;');
              router.replace('/(auth)/cadastro');
            } catch (error) {
              try {
                await db.execAsync('PRAGMA foreign_keys = ON;');
              } catch {}

              logger.error('[Backup] Falha ao limpar dados:', error);
              mostrarErroBackup(
                'Falha ao limpar dados',
                'Nao foi possivel apagar os dados agora. Tente novamente.',
              );
            } finally {
              hideAppLoading();
            }
          },
        },
      ],
    );
  };

  return {
    importarBackup,
    importandoBackup,
    limparTodosOsDados,
  };
}
