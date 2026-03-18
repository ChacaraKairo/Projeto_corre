import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import db from '../../database/DatabaseInit';

export function useEditarPerfil(
  visivel: boolean,
  onClose: () => void,
  onSalvoSucesso: () => void,
) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoMeta, setTipoMeta] = useState<
    'diaria' | 'semanal'
  >('diaria');
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Carrega os dados sempre que o modal for aberto
  useEffect(() => {
    if (visivel) {
      carregarDados();
    }
  }, [visivel]);

  const carregarDados = async () => {
    try {
      // Pega o utilizador (Assumindo que há apenas 1 perfil local)
      const user: any = await db.getFirstAsync(
        'SELECT * FROM perfil_usuario LIMIT 1',
      );
      if (user) {
        setNome(user.nome || '');
        setSenha(user.senha || '');
        setTipoMeta(user.tipo_meta || 'diaria');
      }

      // Pega todos os veículos para a lista de exclusão
      const listaVeiculos = await db.getAllAsync(
        'SELECT * FROM veiculos',
      );
      setVeiculos(listaVeiculos);
    } catch (error) {
      console.error(
        'Erro ao carregar dados para edição:',
        error,
      );
    }
  };

  const salvarDados = async () => {
    if (!nome.trim()) {
      Alert.alert('Aviso', 'O nome não pode estar vazio.');
      return;
    }

    setLoading(true);
    try {
      await db.runAsync(
        'UPDATE perfil_usuario SET nome = ?, senha = ?, tipo_meta = ?',
        [nome.trim(), senha, tipoMeta],
      );

      Alert.alert(
        'Sucesso',
        'Os teus dados foram atualizados!',
      );
      onSalvoSucesso(); // Avisa a tela de perfil para recarregar os dados
      onClose(); // Fecha o modal
    } catch (error) {
      console.error(
        'Erro ao salvar edição de perfil:',
        error,
      );
      Alert.alert(
        'Erro',
        'Ocorreu um problema ao salvar os dados.',
      );
    } finally {
      setLoading(false);
    }
  };

  const apagarVeiculo = (id: number, modelo: string) => {
    Alert.alert(
      'Apagar Veículo',
      `Tens a certeza que queres apagar o veículo ${modelo}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              await db.runAsync(
                'DELETE FROM veiculos WHERE id = ?',
                [id],
              );
              // Remove da lista atual da tela para não precisar recarregar tudo
              setVeiculos((prev) =>
                prev.filter((v) => v.id !== id),
              );
            } catch (error) {
              Alert.alert(
                'Erro',
                'Não foi possível apagar o veículo.',
              );
            }
          },
        },
      ],
    );
  };

  return {
    nome,
    setNome,
    senha,
    setSenha,
    tipoMeta,
    setTipoMeta,
    veiculos,
    loading,
    salvarDados,
    apagarVeiculo,
  };
}
