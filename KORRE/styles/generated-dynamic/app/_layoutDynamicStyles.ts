type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: (params: DynamicStyleParams) => ({
          position: 'absolute',
          bottom: 0, // Fixado embaixo
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.9)', // Fundo escuro para destacar o verde neon
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#39FF14',
          zIndex: 9999,
        }) as DynamicStyle,
};
