import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import db from '../../database/DatabaseInit';

export function useHistorico() {
  const [loading, setLoading] = useState(true);

  const [periodo, setPeriodo] = useState<
    'dia' | 'semana' | 'mes'
  >('semana');
  const [dataRef, setDataRef] = useState(new Date());

  // Estado para o Modal de Ações (Editar/Deletar)
  const [registroSelecionado, setRegistroSelecionado] =
    useState<any>(null);

  // Filtro de Veículo
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [veiculoFiltro, setVeiculoFiltro] = useState<
    number | 'todos'
  >('todos');
  const [modalVeiculo, setModalVeiculo] = useState(false);

  const [dadosResumo, setDadosResumo] = useState({
    ganhos: 0,
    gastos: 0,
    saldo: 0,
  });

  const [movimentacoes, setMovimentacoes] = useState<any[]>(
    [],
  );

  const carregarDados = useCallback(async () => {
    setLoading(true);
    try {
      // Carrega os veículos disponíveis
      const frota = await db.getAllAsync(
        'SELECT * FROM veiculos',
      );
      setVeiculos(frota);

      let dataInicioStr = '';
      let dataFimStr = '';
      const ano = dataRef.getFullYear();
      const mes = String(dataRef.getMonth() + 1).padStart(
        2,
        '0',
      );
      const dia = String(dataRef.getDate()).padStart(
        2,
        '0',
      );

      if (periodo === 'dia') {
        dataInicioStr = `${ano}-${mes}-${dia} 00:00:00`;
        dataFimStr = `${ano}-${mes}-${dia} 23:59:59`;
      } else if (periodo === 'semana') {
        const start = new Date(dataRef);
        start.setDate(dataRef.getDate() - dataRef.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        dataInicioStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')} 00:00:00`;
        dataFimStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')} 23:59:59`;
      } else if (periodo === 'mes') {
        const end = new Date(
          ano,
          dataRef.getMonth() + 1,
          0,
        );
        dataInicioStr = `${ano}-${mes}-01 00:00:00`;
        dataFimStr = `${ano}-${mes}-${String(end.getDate()).padStart(2, '0')} 23:59:59`;
      }

      let query = `
        SELECT t.*, c.nome as categoria_nome
        FROM transacoes_financeiras t
        LEFT JOIN categorias_financeiras c ON t.categoria_id = c.id
        WHERE t.data_transacao >= ? AND t.data_transacao <= ?
      `;
      const params: any[] = [dataInicioStr, dataFimStr];

      if (veiculoFiltro !== 'todos') {
        query += ' AND t.veiculo_id = ?';
        params.push(veiculoFiltro);
      }

      query += ' ORDER BY t.data_transacao DESC';

      const transacoes = await db.getAllAsync(
        query,
        params,
      );

      let ganhos = 0;
      let gastos = 0;

      const formatadas = transacoes.map((t: any) => {
        const val = t.valor || 0;
        if (t.tipo === 'ganho') ganhos += val;
        else gastos += val;

        // Formatar tempo se for hoje ou data curta
        const dataHoraParts = t.data_transacao.split(' ');
        const horaStr = dataHoraParts[1]
          ? dataHoraParts[1].substring(0, 5)
          : '';
        const dataStr = dataHoraParts[0]
          .split('-')
          .reverse()
          .slice(0, 2)
          .join('/'); // DD/MM

        return {
          id: t.id,
          tipo: t.tipo,
          categoria: t.categoria_nome || 'Outros',
          valor: val,
          data:
            periodo === 'dia'
              ? horaStr
              : `${dataStr} ${horaStr}`,
          iconId:
            t.tipo === 'ganho'
              ? 'Briefcase'
              : 'AlertCircle',
          cor: t.tipo === 'ganho' ? '#00C853' : '#EF4444',
        };
      });

      setDadosResumo({
        ganhos,
        gastos,
        saldo: ganhos - gastos,
      });
      setMovimentacoes(formatadas);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    } finally {
      setLoading(false);
    }
  }, [dataRef, periodo, veiculoFiltro]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados]),
  );

  // Formatação da Data no Header
  const getLabelData = () => {
    if (periodo === 'dia') {
      return dataRef.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      });
    } else if (periodo === 'semana') {
      const start = new Date(dataRef);
      start.setDate(dataRef.getDate() - dataRef.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.getDate()} ${start.toLocaleDateString('pt-BR', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('pt-BR', { month: 'short' })}`;
    } else {
      return dataRef.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
    }
  };

  const navegarData = (direcao: number) => {
    const novaData = new Date(dataRef);
    if (periodo === 'dia')
      novaData.setDate(dataRef.getDate() + direcao);
    if (periodo === 'semana')
      novaData.setDate(dataRef.getDate() + direcao * 7);
    if (periodo === 'mes')
      novaData.setMonth(dataRef.getMonth() + direcao);
    setDataRef(novaData);
  };

  const mudarPeriodo = (
    novoPeriodo: 'dia' | 'semana' | 'mes',
  ) => {
    setPeriodo(novoPeriodo);
    setDataRef(new Date());
  };

  // === AÇÕES DE GESTÃO DE REGISTOS ===

  const abrirOpcoesRegistro = (item: any) => {
    setRegistroSelecionado(item);
  };

  const fecharOpcoes = () => {
    setRegistroSelecionado(null);
  };

  const editarRegistro = () => {
    if (!registroSelecionado) return;
    fecharOpcoes();
    // Futuro: Redirecionar para tela de edição (ex: router.push(`/editar_transacao?id=${registroSelecionado.id}`))
    Alert.alert(
      'Editar',
      `Vai editar o registo: ${registroSelecionado.categoria}`,
    );
  };

  const deletarRegistro = () => {
    if (!registroSelecionado) return;

    Alert.alert(
      'Apagar Registo',
      `Tem a certeza que deseja apagar o registo de ${registroSelecionado.categoria} no valor de R$ ${registroSelecionado.valor.toFixed(2)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync(
                'DELETE FROM transacoes_financeiras WHERE id = ?',
                [registroSelecionado.id],
              );
              await carregarDados(); // Recarrega os dados imediatamente
              fecharOpcoes();
            } catch (error) {
              Alert.alert(
                'Erro',
                'Não foi possível apagar o registo.',
              );
            }
          },
        },
      ],
    );
  };

  return {
    loading,
    veiculos,
    veiculoFiltro,
    setVeiculoFiltro,
    modalVeiculo,
    setModalVeiculo,
    periodo,
    mudarPeriodo,
    getLabelData,
    navegarData,
    dadosResumo,
    movimentacoes,
    registroSelecionado,
    abrirOpcoesRegistro,
    fecharOpcoes,
    editarRegistro,
    deletarRegistro,
  };
}
