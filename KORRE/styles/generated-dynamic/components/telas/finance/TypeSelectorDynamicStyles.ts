type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ tipo }: DynamicStyleParams) => ({
          flex: 1,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor:
            tipo === 'ganho' ? '#00C853' : 'transparent',
          alignItems: 'center',
        }) as DynamicStyle,
  inline2: ({ tipo }: DynamicStyleParams) => ({
            fontSize: 10,
            fontWeight: '900',
            textTransform: 'uppercase',
            color: tipo === 'ganho' ? '#000' : '#888',
          }) as DynamicStyle,
  inline3: ({ tipo }: DynamicStyleParams) => ({
          flex: 1,
          paddingVertical: 12,
          borderRadius: 12,
          backgroundColor:
            tipo === 'despesa' ? '#D50000' : 'transparent',
          alignItems: 'center',
        }) as DynamicStyle,
  inline4: ({ tipo }: DynamicStyleParams) => ({
            fontSize: 10,
            fontWeight: '900',
            textTransform: 'uppercase',
            color: tipo === 'despesa' ? '#FFF' : '#888',
          }) as DynamicStyle,
};
