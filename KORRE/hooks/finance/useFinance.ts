import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ComponentType,
} from 'react';
import { TextInput } from 'react-native';
import {
  useRouter,
  useLocalSearchParams,
  useFocusEffect,
} from 'expo-router';
import * as Icons from 'lucide-react-native';
import db from '../../database/DatabaseInit';
import { showCustomAlert } from '../alert/useCustomAlert';
import { verificarMetaDiaria } from '../../notifications/LocalNotificationScheduler';
import type {
  CategoriaFinanceira,
  TipoTransacao,
  UsuarioLocal,
  Veiculo,
} from '../../types/database';
import { logger } from '../../utils/logger';
import {
  hideAppLoading,
  showAppLoadingAsync,
} from '../ui/useAppLoading';

export const useFinance = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const getTipoInicial = useCallback(() => {
    return params.initialType === 'despesa'
      ? 'despesa'
      : 'ganho';
  }, [params.initialType]);

  const [tipo, setTipo] = useState<TipoTransacao>(
    getTipoInicial(),
  );
  const [valor, setValor] = useState('0,00');
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [allVehicles, setAllVehicles] = useState<Veiculo[]>(
    [],
  );
  const [selectedVehicleId, setSelectedVehicleId] =
    useState<number | null>(null);
  const [categorias, setCategorias] = useState<
    Array<{
      id: string;
      nome: string;
      icon: ComponentType<{ size?: number; color?: string }>;
      cor?: string | null;
    }>
  >([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(
    null,
  );

  const [modalCategoriaAberto, setModalCategoriaAberto] =
    useState(false);
  const [novaCategoriaNome, setNovaCategoriaNome] =
    useState('');
  const [novaCategoriaIcone, setNovaCategoriaIcone] =
    useState('Briefcase');

  const inputRef = useRef<TextInput>(null);
  const mainColor =
    tipo === 'ganho' ? '#00C853' : '#F44336';

  const valorNumerico = parseFloat(
    valor.replace(/\./g, '').replace(',', '.'),
  );

  const carregarCategorias = useCallback(async (tipoConsulta = tipo) => {
    setCategoriaSelecionada('');

    const catList = await db.getAllAsync<CategoriaFinanceira>(
      `SELECT id, nome, tipo, icone, cor
       FROM categorias_financeiras
       WHERE tipo = ?`,
      [tipoConsulta],
    );

    const formatadas = catList.map((cat) => ({
      id: cat.id.toString(),
      nome: cat.nome,
      icon:
        (Icons as any)[cat.icone || 'Briefcase'] ||
        Icons.Briefcase,
      cor: cat.cor,
    }));

    setCategorias(formatadas);
  }, [tipo]);

  useFocusEffect(
    useCallback(() => {
      const tipoInicial = getTipoInicial();
      setTipo(tipoInicial);
      setValor('0,00');
      setCategoriaSelecionada('');
      setCategorias([]);
      setShowSuccess(false);
      setSalvando(false);
    }, [getTipoInicial]),
  );

  useEffect(() => {
    const tipoInicial = getTipoInicial();
    setTipo(tipoInicial);
    setCategoriaSelecionada('');
    setCategorias([]);
  }, [getTipoInicial, params.ts]);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS categorias_financeiras (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome TEXT UNIQUE,
              tipo TEXT,
              icone TEXT,
              cor TEXT
            );
            INSERT OR IGNORE INTO categorias_financeiras (nome, tipo, icone, cor) VALUES
            ('iFood', 'ganho', 'ShoppingBag', '#EA1D2C'),
            ('Uber', 'ganho', 'Navigation', '#000000'),
            ('99', 'ganho', 'Smartphone', '#FFCC00'),
            ('Rappi', 'ganho', 'ShoppingBag', '#FF441F'),
            ('Loggi', 'ganho', 'Package', '#00B5E2'),
            ('Lalamove', 'ganho', 'Truck', '#EA5B0C'),
            ('InDrive', 'ganho', 'Car', '#8BC34A'),
            ('Uber Eats', 'ganho', 'ShoppingBag', '#06C167'),
            ('Mercado Livre Envios', 'ganho', 'Package', '#FFE600'),
            ('Shopee Entregas', 'ganho', 'Package', '#EE4D2D'),
            ('Amazon Flex', 'ganho', 'Package', '#FF9900'),
            ('Borzo', 'ganho', 'Zap', '#00AEEF'),
            ('Zé Delivery', 'ganho', 'Zap', '#FFD700'),
            ('Cabify', 'ganho', 'Car', '#7145D6'),
            ('Wappa', 'ganho', 'Car', '#1976D2'),
            ('Táxi / Local', 'ganho', 'Car', '#FFC107'),
            ('Frete particular', 'ganho', 'Truck', '#00C853'),
            ('Particulares', 'ganho', 'Briefcase', '#00C853'),
            ('Combustível', 'despesa', 'Fuel', '#F44336'),
            ('Alimentação', 'despesa', 'Coffee', '#FF9800'),
            ('Manutenção', 'despesa', 'Wrench', '#795548'),
            ('Celular', 'despesa', 'Smartphone', '#9C27B0'),
            ('Lavagem', 'despesa', 'Zap', '#03A9F4');
          `);

          const usuario = await db.getFirstAsync<UsuarioLocal>(
            'SELECT id FROM perfil_usuario LIMIT 1',
          );
          if (!usuario) {
            setUsuarioId(null);
            setAllVehicles([]);
            setSelectedVehicleId(null);
            await carregarCategorias(tipo);
            return;
          }

          setUsuarioId(usuario.id);

          const veiculos = await db.getAllAsync<Veiculo>(
            `SELECT id, tipo, marca, modelo, ano, motor, placa, km_atual, ativo, id_user
             FROM veiculos
             WHERE id_user = ?
             ORDER BY ativo DESC, id ASC`,
            [usuario?.id],
          );
          setAllVehicles(veiculos);

          if (veiculos.length > 0) {
            const veiculoAtivo =
              veiculos.find((v) => v.ativo === 1) ||
              veiculos[0];
            setSelectedVehicleId(veiculoAtivo.id);
          } else {
            setSelectedVehicleId(null);
          }

          await carregarCategorias(tipo);
        } catch (error) {
          logger.error(
            'Erro ao carregar dados financeiros:',
            error,
          );
        }
      }
      loadData();
    }, [tipo, carregarCategorias]),
  );

  const handleValueChange = (text: string) => {
    const cleanText = text.replace(/\D/g, '');
    if (!cleanText) {
      setValor('0,00');
      return;
    }
    let formattedValue = (
      parseInt(cleanText, 10) / 100
    ).toFixed(2);
    formattedValue = formattedValue.replace('.', ',');
    formattedValue = formattedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );
    setValor(formattedValue);
  };

  const handleSave = async () => {
    if (salvando || valorNumerico <= 0 || !categoriaSelecionada)
      return;

    try {
      setSalvando(true);
      await showAppLoadingAsync(
        tipo === 'ganho'
          ? 'Salvando ganho...'
          : 'Salvando despesa...',
      );
      await db.runAsync(
        `INSERT INTO transacoes_financeiras
        (veiculo_id, categoria_id, valor, tipo, data_transacao)
        VALUES (?, ?, ?, ?, datetime('now', 'localtime'))`,
        [
          selectedVehicleId,
          parseInt(categoriaSelecionada),
          valorNumerico,
          tipo,
        ],
      );

      await verificarMetaDiaria();
      setShowSuccess(true);
      setTimeout(() => {
        hideAppLoading();
        setSalvando(false);
        setShowSuccess(false);
        setValor('0,00');
        setCategoriaSelecionada('');
        router.replace('/(tabs)/dashboard');
      }, 1200);
    } catch (error) {
      logger.error('Erro ao salvar transacao:', error);
      hideAppLoading();
      setSalvando(false);
      showCustomAlert(
        'Erro',
        'Não foi possível salvar a transação.',
      );
    }
  };

  const handleAddCategoria = async () => {
    if (!novaCategoriaNome.trim()) return;

    try {
      const corPadrao =
        tipo === 'ganho' ? '#00C853' : '#F44336';

      await showAppLoadingAsync('Criando categoria...');
      await db.runAsync(
        'INSERT INTO categorias_financeiras (nome, tipo, icone, cor) VALUES (?, ?, ?, ?)',
        [
          novaCategoriaNome.trim(),
          tipo,
          novaCategoriaIcone,
          corPadrao,
        ],
      );

      setNovaCategoriaNome('');
      setNovaCategoriaIcone('Briefcase');
      setModalCategoriaAberto(false);
      await carregarCategorias();
    } catch (error) {
      logger.error('Erro ao adicionar categoria:', error);
      showCustomAlert(
        'Erro',
        'Nome de categoria já existe ou erro no banco.',
      );
    } finally {
      hideAppLoading();
    }
  };

  return {
    tipo,
    setTipo,
    valor,
    valorNumerico,
    handleValueChange,
    categoriaSelecionada,
    setCategoriaSelecionada,
    showSuccess,
    salvando,
    allVehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    categorias,
    mainColor,
    inputRef,
    handleSave,
    router,
    modalCategoriaAberto,
    setModalCategoriaAberto,
    novaCategoriaNome,
    setNovaCategoriaNome,
    novaCategoriaIcone,
    setNovaCategoriaIcone,
    handleAddCategoria,
  };
};
