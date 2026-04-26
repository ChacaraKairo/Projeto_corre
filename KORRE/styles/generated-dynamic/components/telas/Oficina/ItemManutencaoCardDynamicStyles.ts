type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ info }: DynamicStyleParams) => ({
              color: info.cor,
              fontSize: 8,
              fontWeight: '900',
              textTransform: 'uppercase',
            }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
              color: isDark ? '#666' : '#888',
              fontSize: 10,
              fontWeight: '900',
              textTransform: 'uppercase',
            }) as DynamicStyle,
  inline3: ({ info }: DynamicStyleParams) => ({
              color: info.cor,
              fontSize: 12,
              fontWeight: '900',
            }) as DynamicStyle,
  inline4: ({ info }: DynamicStyleParams) => ({
              height: '100%',
              width: `${info.percentagemDesgaste}%`,
              backgroundColor: info.cor,
            }) as DynamicStyle,
  inline5: ({ isDark }: DynamicStyleParams) => ({
              color: isDark ? '#888' : '#555',
              fontSize: 10,
              fontWeight: '900',
              textTransform: 'uppercase',
            }) as DynamicStyle,
};
