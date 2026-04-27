import Constants from 'expo-constants';
import db from '../database/DatabaseInit';

const LIMITE_MENSAL_MEI = 6750;
const isExpoGo = Constants.appOwnership === 'expo';

export const NotificacaoMEI = {
  async gerarTextoNotificacaoSemanal() {
    try {
      const agora = new Date();
      const anoAtual = agora.getFullYear();
      const mesAtual = (agora.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const dataInicioMes = `${anoAtual}-${mesAtual}-01 00:00:00`;

      const result: any = await db.getFirstAsync(
        "SELECT SUM(valor) as total FROM transacoes_financeiras WHERE tipo = 'ganho' AND data_transacao >= ?",
        [dataInicioMes],
      );

      const totalGanhos = result?.total || 0;
      const porcentagem = (
        (totalGanhos / LIMITE_MENSAL_MEI) *
        100
      ).toFixed(1);
      const restante = (
        LIMITE_MENSAL_MEI - totalGanhos
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      if (parseFloat(porcentagem) >= 95) {
        return `CRÍTICO: Você atingiu ${porcentagem}% do limite MEI! Restam apenas ${restante}.`;
      }

      return `Seu faturamento MEI está em ${porcentagem}% este mês. Você ainda tem ${restante} de margem.`;
    } catch (error) {
      console.error(
        'Erro ao calcular dados para notificação:',
        error,
      );
      return 'Confira como está seu faturamento MEI para este mês!';
    }
  },

  async dispararNotificacaoFaturamento() {
    if (isExpoGo) return;

    const Notifications = await import('expo-notifications');
    const mensagem =
      await this.gerarTextoNotificacaoSemanal();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alerta de Faturamento MEI',
        body: mensagem,
        data: { screen: '/(relatorios)' },
        sound: true,
      },
      trigger: null,
    });
  },
};
