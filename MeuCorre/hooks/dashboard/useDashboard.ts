// MeuCorre/hooks/dashboard/useDashboard.ts
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import db from '../../database/DatabaseInit';
import { CalculadoraRepository } from '../../database/repositories/CalculadoraRepository';
import { FinanceiroRepository } from '../../database/repositories/FinanceiroRepository';
import { getFraseDoMomento } from './frasesService';

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
      meta: 0,
      qtdGanhos: 0,
    },
    movimentacoes: [] as any[],
  });

  const carregarTudo = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Dados Básicos
      const veiculoAtivo =
        await CalculadoraRepository.getVeiculoAtivo();
      const frase = getFraseDoMomento();

      if (veiculoAtivo) {
        const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // 2. Busca Paralela (Performance Máxima)
        const [resGanhos, resGastos, ultimas] =
          await Promise.all([
            FinanceiroRepository.getResumoPorPeriodo(
              veiculoAtivo.id,
              hoje,
              'ganho',
            ),
            FinanceiroRepository.getResumoPorPeriodo(
              veiculoAtivo.id,
              hoje,
              'despesa',
            ),
            FinanceiroRepository.getUltimasMovimentacoes(5),
          ]);

        setData((prev) => ({
          ...prev,
          veiculo: veiculoAtivo,
          frase,
          movimentacoes: ultimas,
          financeiro: {
            ganhos: resGanhos?.total || 0,
            gastos: resGastos?.total || 0,
            qtdGanhos: resGanhos?.qtd || 0,
            meta: 0, // Buscar do perfil do usuário futuramente
          },
        }));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTudo();
    }, [carregarTudo]),
  );

  // Lógica de UI (Atoms/Molecules Actions)
  const onUpdateKm = async (novoKm: number) => {
    if (!data.veiculo) return;

    try {
      await db.runAsync(
        'UPDATE veiculos SET km_atual = ? WHERE id = ?',
        [novoKm, data.veiculo.id],
      );

      // O PULO DO GATO: Avisa o app todo que o KM mudou
      DeviceEventEmitter.emit('KM_UPDATED', { novoKm });

      // Atualização otimista do estado local para maior performance (sem reload completo)
      setData((prev) => ({
        ...prev,
        veiculo: { ...prev.veiculo, km_atual: novoKm },
      }));
    } catch (error) {
      console.error(
        '[Dashboard] Erro ao atualizar KM:',
        error,
      );
    }
  };

  return { ...data, loading, onUpdateKm, router };
};
