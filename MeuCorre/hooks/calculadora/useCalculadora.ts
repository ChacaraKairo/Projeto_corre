import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import db from '../../database/DatabaseInit';
// IMPORTANTE: Agora usamos a Fonte Única de Verdade (SSOT)
import { FormularioViabilidade } from '../../type/viabilidadeCorrida';
// IMPORTANTE: Trazendo as regras de IPVA
import {
  REGRAS_IPVA_ESTADOS,
  SiglaEstado,
} from '../../type/ipvaEstados';
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
      campo: keyof FormularioViabilidade,
      valor: string | number,
    ) => {
      // Ignora a máscara para campos de texto/seleção
      if (
        campo === 'tipo_aquisicao' ||
        campo === 'estado_uf'
      ) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        return;
      }

      // Previne erros se por acaso o valor já for um número (via código interno)
      if (typeof valor === 'number') {
        setForm((prev) => ({
          ...prev,
          [campo]: valor as any,
        }));
        return;
      }

      // 1. Transforma o que foi digitado em string e troca vírgula por ponto (padrão decimal)
      // Usando String() por segurança para o TypeScript não reclamar do replace
      let textoLimpo = String(valor).replace(',', '.');

      // 2. Remove letras e caracteres inválidos (deixa apenas números e o ponto)
      textoLimpo = textoLimpo.replace(/[^0-9.]/g, '');

      // 3. Impede que o usuário digite mais de um ponto (ex: 10..5)
      const partes = textoLimpo.split('.');
      if (partes.length > 2) {
        textoLimpo =
          partes[0] + '.' + partes.slice(1).join('');
      }

      // 4. Salva no estado a string exata que o usuário está digitando (permitindo "10.")
      setForm((prev) => ({
        ...prev,
        [campo]: textoLimpo as any,
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

  // Validações apontando para as chaves reais do banco de dados
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

  // MOTOR IPVA INTEGRADO 🚀
  // MOTOR IPVA INTEGRADO 🚀
  const calcularIPVAAutomatico = useCallback(
    (ufSelecionada?: SiglaEstado) => {
      // 1. Usa o estado selecionado no modal OU o que já está salvo no formulário
      const estado =
        ufSelecionada ||
        (form.estado_uf as SiglaEstado) ||
        'SP';
      const valorFipe = Number(form.valor_veiculo_fipe);
      const tipoVeiculo = veiculoAtivo?.tipo;
      const anoVeiculo = veiculoAtivo?.ano;

      // 2. Se o usuário escolheu um estado novo pelo Modal, atualizamos o formulário
      if (
        ufSelecionada &&
        ufSelecionada !== form.estado_uf
      ) {
        handleChange('estado_uf', ufSelecionada);
      }

      // 3. Validação de dados básicos
      if (!valorFipe || !tipoVeiculo) {
        showCustomAlert(
          'Dados Insuficientes',
          'Informe o valor FIPE do veículo primeiro para calcularmos o IPVA.',
        );
        return;
      }

      const regra = REGRAS_IPVA_ESTADOS[estado];
      if (!regra) return;

      // 4. Verificação de Isenção por Idade
      const anoAtual = new Date().getFullYear();
      const idadeVeiculo =
        anoAtual - Number(anoVeiculo || anoAtual);

      if (idadeVeiculo >= regra.anos_isencao_idade) {
        handleChange('ipva_anual', '0');
        showCustomAlert(
          'Veículo Isento',
          `Em ${estado}, veículos com ${regra.anos_isencao_idade} anos ou mais não pagam IPVA.`,
        );
        return;
      }

      // 5. Seleção da Alíquota correta baseada no tipo do veículo
      let aliquota = regra.aliquota_carro; // Padrão para carro passeio

      if (tipoVeiculo === 'moto') {
        aliquota = regra.aliquota_moto;
      } else if (tipoVeiculo === 'carro_eletrico') {
        aliquota = regra.aliquota_eletrico;
      } else if (
        ['van', 'caminhao'].includes(tipoVeiculo)
      ) {
        aliquota = regra.aliquota_van;
      }

      // 6. Cálculo e Atualização do Formulário
      const valorCalculado = (valorFipe * aliquota).toFixed(
        2,
      );

      // Salvamos o valor calculado no estado
      handleChange('ipva_anual', valorCalculado);

      showCustomAlert(
        'Cálculo Concluído',
        `IPVA para ${estado} calculado com alíquota de ${(aliquota * 100).toFixed(1)}%.\n\nValor estimado: R$ ${valorCalculado.replace('.', ',')}`,
      );
    },
    [
      form.estado_uf,
      form.valor_veiculo_fipe,
      veiculoAtivo,
      handleChange,
    ],
  );

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
