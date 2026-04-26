import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { AppRoutes } from '../constants/routes';
import { handleRemoteCommand } from './RemoteCommandHandler';

export const NotificationHandler = {
  setupForegroundHandler: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },
  listenToReceived: () => {
    return Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data;
        if (data?.kind === 'command') {
          await handleRemoteCommand(data);
        }
      },
    );
  },
  listenToClicks: () => {
    return Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const data = response.notification.request.content.data;

        if (data?.kind === 'command') {
          await handleRemoteCommand(data);
          return;
        }

        const destino =
          typeof data?.destino === 'string'
            ? data.destino
            : AppRoutes.notificacoes;
        router.push(destino as never);
      },
    );
  },
};
