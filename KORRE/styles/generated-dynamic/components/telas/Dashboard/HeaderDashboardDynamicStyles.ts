type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: (params: DynamicStyleParams) => ({
                  width: 48, // <-- OBRIGATÓRIO: Tamanho fixo para não colapsar
                  height: 48, // <-- OBRIGATÓRIO: Tamanho fixo para não colapsar
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0', // Fundo cinza para ver se o espaço existe
                }) as DynamicStyle,
};
