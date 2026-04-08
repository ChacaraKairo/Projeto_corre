// Arquivo: src/hooks/oficina/useOficinaCalculos.ts
import { useCallback } from 'react';
import { calcularDesgasteItem } from '../../utils/calculoManutencao';

export function useOficinaCalculos(
  veiculoConsultado: any,
  itensVisiveis: any[],
) {
  const calcularProgresso = useCallback(
    (item: any, currentKmOverride?: number) => {
      // Define qual KM usar (o passado por parâmetro ou o do veículo atual)
      const kmAtual =
        currentKmOverride !== undefined
          ? currentKmOverride
          : veiculoConsultado?.km_atual;

      // Chama o nosso utilitário puro para fazer a matemática
      return calcularDesgasteItem(item, kmAtual);
    },
    [veiculoConsultado],
  );

  const getStatusResumo = useCallback(() => {
    // Filtra quantos itens estão fora do padrão OK ou Inicial
    const pendentes = itensVisiveis.filter((item: any) => {
      const status = calcularProgresso(item).status;
      return status !== 'OK' && status !== 'Inicial';
    }).length;

    if (pendentes === 0) {
      return {
        texto: 'Tudo OK',
        cor: '#00C853',
        bg: 'rgba(0, 200, 83, 0.1)',
      };
    }

    return {
      texto: `${pendentes} ${pendentes === 1 ? 'item requer atenção' : 'itens requerem atenção'}`,
      cor: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.1)',
    };
  }, [itensVisiveis, calcularProgresso]);

  return { calcularProgresso, getStatusResumo };
}
