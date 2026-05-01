import { useEffect, useState } from 'react';
import db from '../../database/DatabaseInit';
import { hashPassword } from '../../utils/auth/passwordHash';
import { logger } from '../../utils/logger';
import { showCustomAlert } from '../alert/useCustomAlert';

type TipoMeta = 'diaria' | 'semanal';

interface PerfilUsuario {
  nome?: string | null;
  tipo_meta?: TipoMeta | null;
}

interface VeiculoPerfil {
  id: number;
  modelo: string;
  tipo?: string | null;
  placa?: string | null;
}

export function useEditarPerfil(
  visivel: boolean,
  onClose: () => void,
  onSalvoSucesso: () => void,
) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoMeta, setTipoMeta] =
    useState<TipoMeta>('diaria');
  const [veiculos, setVeiculos] = useState<VeiculoPerfil[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const carregarDados = async () => {
    try {
      const user =
        await db.getFirstAsync<PerfilUsuario>(
          `SELECT nome, tipo_meta
           FROM perfil_usuario
           LIMIT 1`,
        );

      if (user) {
        setNome(user.nome || '');
        setSenha('');
        setTipoMeta(
          user.tipo_meta === 'semanal' ? 'semanal' : 'diaria',
        );
      }

      const listaVeiculos =
        await db.getAllAsync<VeiculoPerfil>(
          'SELECT id, modelo, tipo, placa FROM veiculos',
        );
      setVeiculos(listaVeiculos);
    } catch (error) {
      logger.error(
        '[EditarPerfil] Erro ao carregar dados:',
        error,
      );
    }
  };

  useEffect(() => {
    if (visivel) {
      carregarDados();
    }
  }, [visivel]);

  const salvarDados = async () => {
    if (!nome.trim()) {
      showCustomAlert('Aviso', 'O nome não pode estar vazio.');
      return;
    }

    setLoading(true);
    try {
      if (senha.trim()) {
        const senhaCriptografada = await hashPassword(
          senha.trim(),
        );
        await db.runAsync(
          'UPDATE perfil_usuario SET nome = ?, senha = ?, tipo_meta = ?',
          [nome.trim(), senhaCriptografada, tipoMeta],
        );
      } else {
        await db.runAsync(
          'UPDATE perfil_usuario SET nome = ?, tipo_meta = ?',
          [nome.trim(), tipoMeta],
        );
      }

      showCustomAlert(
        'Sucesso',
        'Os seus dados foram atualizados!',
      );
      onSalvoSucesso();
      onClose();
    } catch (error) {
      logger.error(
        '[EditarPerfil] Erro ao salvar edição:',
        error,
      );
      showCustomAlert(
        'Erro',
        'Ocorreu um problema ao salvar os dados.',
      );
    } finally {
      setLoading(false);
    }
  };

  const apagarVeiculo = (id: number, modelo: string) => {
    showCustomAlert(
      'Apagar Veículo',
      `Tem certeza que quer apagar o veículo ${modelo}? Esta ação não pode ser desfeita.`,
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
              setVeiculos((prev) =>
                prev.filter((veiculo) => veiculo.id !== id),
              );
            } catch (error) {
              logger.error(
                '[EditarPerfil] Erro ao apagar veículo:',
                error,
              );
              showCustomAlert(
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
