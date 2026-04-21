import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import db from '../../database/DatabaseInit';
// IMPORTANTE: Agora usamos a Fonte Única de Verdade (SSOT)
import { FormularioViabilidade } from '../../type/viabilidadeCorrida';
import { showCustomAlert } from '../alert/useCustomAlert';
import { CalculadoraService } from './service/CalculadoraService';

const ESTADO_INICIAL_VAZIO: Partial<FormularioViabilidade> =
  {
    estado_uf: 'SP',
    tipo_aquisicao: 'proprio_quitado',
    imposto_mei_mensal: 86,
    vida_util_smartphone_meses: 18,
    // ... (mantenha os outros campos zerados aqui)
  };

export function useCalculadora() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [veiculosDisponiveis, setVeiculosDisponiveis] =
    useState<any[]>([]);
  const [veiculoAtivo, setVeiculoAtivo] =
    useState<any>(null);

  // O estado do formulário agora é fortemente tipado pela SSOT
  const [form, setForm] = useState<
    Partial<FormularioViabilidade>
  >(ESTADO_INICIAL_VAZIO);

  const handleChange = useCallback(
    (
      campo: keyof FormularioViabilidade, // Tipagem atualizada
      valor: string | number,
    ) => {
      if (
        campo === 'tipo_aquisicao' ||
        campo === 'estado_uf'
      ) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        return;
      }
      const valorNumerico =
        typeof valor === 'string'
          ? parseFloat(valor.replace(',', '.')) || 0
          : valor;
      setForm((prev) => ({
        ...prev,
        [campo]: valorNumerico,
      }));
    },
    [],
  );

  const carregarFormularioVeiculo = useCallback(
    async (veiculo: any) => {
      setVeiculoAtivo(veiculo);
      setLoading(true);
      try {
        const { salvos, oficina } =
          await CalculadoraService.carregarDadosCompletosVeiculo(
            veiculo.id,
          );

        setForm(() => {
          const novoForm = {
            ...ESTADO_INICIAL_VAZIO,
            ...salvos,
          };
          if (oficina.valorOleo)
            novoForm.valor_oleo_filtros = oficina.valorOleo;
          if (oficina.kmOleo)
            novoForm.intervalo_oleo_filtros_km =
              oficina.kmOleo;
          if (oficina.valorPneu)
            novoForm.valor_jogo_pneus = oficina.valorPneu;
          if (oficina.kmPneu)
            novoForm.durabilidade_pneus_km = oficina.kmPneu;
          return novoForm as Partial<FormularioViabilidade>;
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const carregarDadosIniciais = useCallback(async () => {
    try {
      setLoading(true);
      const lista: any[] = await db.getAllAsync(
        'SELECT * FROM veiculos',
      );
      setVeiculosDisponiveis(lista);

      const ativo =
        lista.find((v) => v.ativo === 1) || lista[0];
      if (ativo) await carregarFormularioVeiculo(ativo);
    } finally {
      setLoading(false);
    }
  }, [carregarFormularioVeiculo]);

  useEffect(() => {
    carregarDadosIniciais();
  }, [carregarDadosIniciais]);

  const calcularESalvar = async () => {
    if (!veiculoAtivo) return;
    try {
      await CalculadoraService.processarESalvarCalculos(
        veiculoAtivo.id,
        form,
      );
      showCustomAlert(
        'Atualizado!',
        'Cálculos de viabilidade sincronizados.',
      );
      router.back();
    } catch (error) {
      console.error('[Hook] Erro na orquestração:', error);
      showCustomAlert(
        'Erro',
        'Não foi possível processar a inteligência financeira.',
      );
    }
  };

  const mudarVeiculoAtivo = (veiculo: any) =>
    carregarFormularioVeiculo(veiculo);

  // BUG CORRIGIDO: Agora as validações apontam para as chaves reais do banco de dados
  const validarStatusSecoes = useCallback(() => {
    const operacaoCompleta =
      !!form.rendimento_energia_unidade &&
      !!form.preco_energia_unidade;

    const burocraciaCompleta =
      !!form.ipva_anual &&
      !!form.licenciamento_detran_anual;

    const humanoCompleto =
      !!form.salario_liquido_mensal_desejado &&
      !!form.dias_trabalhados_semana;

    let preenchidos = 0;
    if (operacaoCompleta) preenchidos++;
    if (burocraciaCompleta) preenchidos++;
    if (humanoCompleto) preenchidos++;

    return {
      percentualGeral: (preenchidos / 3) * 100,
      operacaoCompleta,
      burocraciaCompleta,
      humanoCompleto,
    };
  }, [form]);

  const calcularIPVAAutomatico = useCallback(() => {
    showCustomAlert(
      'Em Breve',
      'O preenchimento automático da FIPE e IPVA estará disponível numa atualização futura.',
    );
  }, []);

  return {
    loading,
    veiculoAtivo,
    veiculosDisponiveis,
    form,
    handleChange,
    calcularESalvar,
    mudarVeiculoAtivo,
    validarStatusSecoes,
    calcularIPVAAutomatico,
  };
}
