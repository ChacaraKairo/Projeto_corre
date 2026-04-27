// MeuCorre/hooks/dashboard/useDashboard.ts
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import db from '../../database/DatabaseInit';
import { CalculadoraRepository } from '../../database/repositories/CalculadoraRepository';
import { FinanceiroRepository } from '../../database/repositories/FinanceiroRepository';
import { verificarAlertasManutencao } from '../../notifications/LocalNotificationScheduler';
import {
  hideAppLoading,
  showAppLoadingAsync,
} from '../ui/useAppLoading';
import { getFraseDoMomento } from './frasesService';

const formatarDataLocal = (data: Date) => {
  const pad = (valor: number) =>
    String(valor).padStart(2, '0');
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`;
};

const inicioDoDia = (data: Date) =>
  `${formatarDataLocal(data)} 00:00:00`;

const inicioDaSemana = (data: Date) => {
  const inicio = new Date(data);
  const dia = inicio.getDay();
  const distanciaSegunda = dia === 0 ? -6 : 1 - dia;
  inicio.setDate(inicio.getDate() + distanciaSegunda);
  inicio.setHours(0, 0, 0, 0);
  return inicio;
};

export const useDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    usuario: null as any,
    veiculo: null as any,
    frase: '',
    financeiro: {
      ganhos: 0,
      gastos: 0,
      ganhosMes: 0,
      gastosMes: 0,
      meta: 0,
      qtdGanhos: 0,
      qtdGastos: 0,
    },
    movimentacoes: [] as any[],
  });

  const carregarTudo = useCallback(async () => {
    setLoading(true);
    try {
      const usuarioPerfil = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario LIMIT 1',
      );

      const veiculoAtivo =
        await CalculadoraRepository.getVeiculoAtivo();
      const frase = getFraseDoMomento();

      if (veiculoAtivo) {
        const agora = new Date();
        const tipoMeta =
          (usuarioPerfil as any)?.tipo_meta === 'semanal'
            ? 'semanal'
            : 'diaria';
        const periodoInicio =
          tipoMeta === 'semanal'
            ? inicioDoDia(inicioDaSemana(agora))
            : inicioDoDia(agora);
        const mesInicio = inicioDoDia(
          new Date(agora.getFullYear(), agora.getMonth(), 1),
        );
        const mesFim = inicioDoDia(
          new Date(agora.getFullYear(), agora.getMonth() + 1, 1),
        );

        const [
          resGanhos,
          resGastos,
          resGanhosMes,
          resGastosMes,
          ultimas,
        ] = await Promise.all([
          FinanceiroRepository.getResumoPorPeriodo(
            veiculoAtivo.id,
            periodoInicio,
            'ganho',
          ),
          FinanceiroRepository.getResumoPorPeriodo(
            veiculoAtivo.id,
            periodoInicio,
            'despesa',
          ),
          FinanceiroRepository.getResumoPorPeriodo(
            veiculoAtivo.id,
            mesInicio,
            'ganho',
            mesFim,
          ),
          FinanceiroRepository.getResumoPorPeriodo(
            veiculoAtivo.id,
            mesInicio,
            'despesa',
            mesFim,
          ),
          FinanceiroRepository.getUltimasMovimentacoes(5),
        ]);

        setData((prev) => ({
          ...prev,
          usuario: usuarioPerfil,
          veiculo: veiculoAtivo,
          frase,
          movimentacoes: ultimas,
          financeiro: {
            ganhos: resGanhos?.total || 0,
            gastos: resGastos?.total || 0,
            ganhosMes: resGanhosMes?.total || 0,
            gastosMes: resGastosMes?.total || 0,
            qtdGanhos: resGanhos?.qtd || 0,
            qtdGastos: resGastos?.qtd || 0,
            meta:
              tipoMeta === 'semanal'
                ? (usuarioPerfil as any)?.meta_semanal || 0
                : (usuarioPerfil as any)?.meta_diaria || 0,
          },
        }));
      } else if (usuarioPerfil) {
        setData((prev) => ({
          ...prev,
          usuario: usuarioPerfil,
          frase,
        }));
      }
    } catch (error) {
      console.error(
        '[Dashboard] Erro ao carregar dados:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTudo();
    }, [carregarTudo]),
  );

  const onUpdateKm = async (novoKm: number) => {
    if (!data.veiculo) return;

    try {
      await showAppLoadingAsync('Atualizando KM...');
      await db.runAsync(
        'UPDATE veiculos SET km_atual = ? WHERE id = ?',
        [novoKm, data.veiculo.id],
      );

      DeviceEventEmitter.emit('KM_UPDATED', { novoKm });
      await verificarAlertasManutencao();

      setData((prev) => ({
        ...prev,
        veiculo: { ...prev.veiculo, km_atual: novoKm },
      }));
    } catch (error) {
      console.error(
        '[Dashboard] Erro ao atualizar KM:',
        error,
      );
    } finally {
      hideAppLoading();
    }
  };

  return { ...data, loading, onUpdateKm, router };
};
