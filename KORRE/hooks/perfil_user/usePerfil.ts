import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import db from '../../database/DatabaseInit';
import { PhotoService } from '../../components/telas/Cadastro/script/photoService';
import { AppRoutes } from '../../constants/routes';
import type {
  PerfilUsuario,
  TipoMeta,
  Veiculo,
} from '../../types/database';
import { logger } from '../../utils/logger';
import { showCustomAlert } from '../alert/useCustomAlert';

export function usePerfil() {
  const router = useRouter();
  const [usuario, setUsuario] =
    useState<PerfilUsuario | null>(null);
  const [veiculo, setVeiculo] = useState<Veiculo | null>(
    null,
  );
  const [meta, setMeta] = useState('');
  const [tipoMeta, setTipoMeta] =
    useState<TipoMeta>('diaria');
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const user =
        await db.getFirstAsync<PerfilUsuario>(
          `SELECT id, nome, email, cpf, foto_uri, tipo_meta, meta_diaria, meta_semanal
           FROM perfil_usuario
           LIMIT 1`,
        );

      if (!user) {
        setUsuario(null);
        setVeiculo(null);
        return;
      }

      setUsuario(user);

      const tm: TipoMeta =
        user.tipo_meta === 'semanal' ? 'semanal' : 'diaria';
      setTipoMeta(tm);

      const valorMeta =
        tm === 'semanal'
          ? user.meta_semanal
          : user.meta_diaria;
      setMeta(valorMeta ? String(valorMeta) : '150');

      const veiculoAtivo =
        await db.getFirstAsync<Veiculo>(
          `SELECT id, tipo, marca, modelo, ano, motor, placa, km_atual, ativo, id_user
           FROM veiculos
           WHERE ativo = 1 AND id_user = ?
           LIMIT 1`,
          [user.id],
        );

      setVeiculo(veiculoAtivo ?? null);
    } catch (error) {
      logger.error(
        '[Perfil] Erro ao carregar dados do perfil:',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const listarVeiculosDoUsuario = async () => {
    if (!usuario) return [];

    try {
      return await db.getAllAsync<Veiculo>(
        `SELECT id, tipo, marca, modelo, ano, motor, placa, km_atual, ativo, id_user
         FROM veiculos
         WHERE id_user = ?
         ORDER BY ativo DESC, id ASC`,
        [usuario.id],
      );
    } catch (error) {
      logger.error('[Perfil] Erro ao listar veículos:', error);
      return [];
    }
  };

  const trocarVeiculoAtivo = async (veiculoId: number) => {
    if (!usuario) return false;

    try {
      await db.runAsync(
        'UPDATE veiculos SET ativo = 0 WHERE id_user = ?',
        [usuario.id],
      );
      await db.runAsync(
        'UPDATE veiculos SET ativo = 1 WHERE id = ? AND id_user = ?',
        [veiculoId, usuario.id],
      );
      await carregarDados();
      return true;
    } catch (error) {
      logger.error('[Perfil] Erro ao trocar veículo ativo:', error);
      showCustomAlert(
        'Erro',
        'Não foi possível trocar o veículo ativo.',
      );
      return false;
    }
  };

  const salvarMeta = async () => {
    if (!usuario) return;

    try {
      const valorFormatado = Number.parseFloat(
        meta.replace(',', '.'),
      );
      const campo =
        tipoMeta === 'semanal'
          ? 'meta_semanal'
          : 'meta_diaria';

      await db.runAsync(
        `UPDATE perfil_usuario SET ${campo} = ? WHERE id = ?`,
        [valorFormatado, usuario.id],
      );
      showCustomAlert(
        'Sucesso',
        'A sua meta foi atualizada!',
      );
    } catch (error) {
      logger.error('[Perfil] Erro ao salvar meta:', error);
      showCustomAlert(
        'Erro',
        'Não foi possível atualizar a meta.',
      );
    }
  };

  const alterarFoto = async () => {
    if (!usuario) return;

    try {
      const novaFotoUri = await PhotoService.takePhoto(
        usuario.foto_uri,
      );
      if (novaFotoUri) {
        await db.runAsync(
          'UPDATE perfil_usuario SET foto_uri = ? WHERE id = ?',
          [novaFotoUri, usuario.id],
        );
        await carregarDados();
      }
    } catch (error) {
      logger.error('[Perfil] Erro ao alterar foto:', error);
      showCustomAlert(
        'Erro',
        'Não foi possível alterar a foto de perfil.',
      );
    }
  };

  const realizarLogout = () => {
    showCustomAlert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => router.replace(AppRoutes.login),
        },
      ],
    );
  };

  return {
    usuario,
    veiculo,
    meta,
    setMeta,
    tipoMeta,
    loading,
    alterarFoto,
    salvarMeta,
    realizarLogout,
    carregarDados,
    listarVeiculosDoUsuario,
    trocarVeiculoAtivo,
  };
}
