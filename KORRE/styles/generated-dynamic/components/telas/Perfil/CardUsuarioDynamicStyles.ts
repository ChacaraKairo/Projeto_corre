type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: (params: DynamicStyleParams) => ({
                width: '100%',
                height: '100%',
                borderRadius: 48, // Ajuste para o tamanho exato da sua borda
              }) as DynamicStyle,
};
