import {
  useState,
  useEffect,
  useRef,
  useCallback,
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

  const [tipo, setTipo] = useState<'ganho' | 'despesa'>(
    getTipoInicial(),
  );
  const [valor, setValor] = useState('0,00');
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [allVehicles, setAllVehicles] = useState<any[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] =
    useState<number | null>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
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

  const carregarCategorias = useCallback(async () => {
    const catList = await db.getAllAsync(
      'SELECT * FROM categorias_financeiras WHERE tipo = ?',
      [tipo],
    );

    const formatadas = catList.map((cat: any) => ({
      id: cat.id.toString(),
      nome: cat.nome,
      icon:
        (Icons as any)[cat.icone || 'Briefcase'] ||
        Icons.Briefcase,
      cor: cat.cor,
    }));

    setCategorias(formatadas);
    setCategoriaSelecionada('');
  }, [tipo]);

  useFocusEffect(
    useCallback(() => {
      setTipo(getTipoInicial());
      setValor('0,00');
      setCategoriaSelecionada('');
      setShowSuccess(false);
      setSalvando(false);
    }, [getTipoInicial]),
  );

  useEffect(() => {
    setTipo(getTipoInicial());
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
            ('Combustível', 'despesa', 'Fuel', '#F44336'),
            ('Alimentação', 'despesa', 'Coffee', '#FF9800'),
            ('Manutenção', 'despesa', 'Wrench', '#795548'),
            ('Celular', 'despesa', 'Smartphone', '#9C27B0'),
            ('Lavagem', 'despesa', 'Zap', '#03A9F4');
          `);

          const usuario: any = await db.getFirstAsync(
            'SELECT id FROM perfil_usuario LIMIT 1',
          );
          if (usuario) setUsuarioId(usuario.id);

          const veiculos = await db.getAllAsync(
            'SELECT * FROM veiculos ORDER BY ativo DESC, id ASC',
          );
          setAllVehicles(veiculos);

          if (veiculos.length > 0) {
            const veiculoAtivo: any =
              veiculos.find((v: any) => v.ativo === 1) ||
              veiculos[0];
            setSelectedVehicleId(veiculoAtivo.id);
          }

          await carregarCategorias();
        } catch (error) {
          console.error(
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
      console.error('Erro ao salvar transacao:', error);
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
      console.error('Erro ao adicionar categoria:', error);
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
