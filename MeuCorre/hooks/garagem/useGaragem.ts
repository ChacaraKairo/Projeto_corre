import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import db from '../../database/DatabaseInit';

export function useGaragem() {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados dos Modais
  const [modalDelete, setModalDelete] = useState({
    visivel: false,
    veiculo: null as any,
  });
  const [modalNovo, setModalNovo] = useState(false);
  const [confirmacaoPlaca, setConfirmacaoPlaca] =
    useState('');

  // Busca os veículos no banco de dados
  const carregarVeiculos = useCallback(async () => {
    setLoading(true);
    try {
      // Ordena para que o veículo ativo (ativo = 1) apareça sempre em primeiro lugar
      const lista = await db.getAllAsync(
        'SELECT * FROM veiculos ORDER BY ativo DESC, id ASC',
      );
      setVeiculos(lista);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar a sua garagem.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarVeiculos();
  }, [carregarVeiculos]);

  // --- LÓGICA DE TROCA ---
  const ativarVeiculo = async (veiculo: any) => {
    try {
      // 1. Desativa todos
      await db.runAsync('UPDATE veiculos SET ativo = 0');
      // 2. Ativa apenas o selecionado
      await db.runAsync(
        'UPDATE veiculos SET ativo = 1 WHERE id = ?',
        [veiculo.id],
      );

      await carregarVeiculos(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao trocar veículo ativo:', error);
      Alert.alert(
        'Erro',
        'Não foi possível ativar o veículo.',
      );
    }
  };

  // --- LÓGICA DE ADIÇÃO ---
  const adicionarVeiculo = async (novoVeiculo: any) => {
    try {
      await db.runAsync(
        `INSERT INTO veiculos (tipo, modelo, placa, km_atual, ativo) VALUES (?, ?, ?, ?, ?)`,
        [
          novoVeiculo.tipo,
          `${novoVeiculo.marca} ${novoVeiculo.modelo}`.trim(),
          novoVeiculo.placa,
          novoVeiculo.km_atual,
          veiculos.length === 0 ? 1 : 0, // Se for o primeiro registo, já fica ativo
        ],
      );
      await carregarVeiculos(); // Recarrega a lista
      setModalNovo(false);
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error);
      Alert.alert(
        'Erro',
        'Não foi possível adicionar a nova máquina.',
      );
      throw error;
    }
  };

  // --- LÓGICA DE EXCLUSÃO ---
  const solicitarExclusao = (veiculo: any) => {
    setConfirmacaoPlaca('');
    setModalDelete({ visivel: true, veiculo });
  };
  const cancelarExclusao = () =>
    setModalDelete({ visivel: false, veiculo: null });

  const confirmarExclusao = async () => {
    if (!modalDelete.veiculo) return;

    if (
      confirmacaoPlaca.toUpperCase() ===
      modalDelete.veiculo.placa.toUpperCase()
    ) {
      try {
        // O "ON DELETE CASCADE" no seu SQLite vai apagar automaticamente
        // as manutenções e histórico atrelados a este veículo!
        await db.runAsync(
          'DELETE FROM veiculos WHERE id = ?',
          [modalDelete.veiculo.id],
        );

        await carregarVeiculos(); // Recarrega a lista
        setModalDelete({ visivel: false, veiculo: null });
        Alert.alert(
          'Sucesso',
          'Veículo removido da garagem.',
        );
      } catch (error) {
        console.error('Erro ao apagar veículo:', error);
        Alert.alert(
          'Erro',
          'Não foi possível remover o veículo.',
        );
      }
    }
  };

  return {
    veiculos,
    loading,
    carregarVeiculos,
    ativarVeiculo,
    adicionarVeiculo,
    modalNovo,
    setModalNovo,
    modalDelete,
    solicitarExclusao,
    cancelarExclusao,
    confirmarExclusao,
    confirmacaoPlaca,
    setConfirmacaoPlaca,
  };
}
