type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isAtivo }: DynamicStyleParams) => ({
                  color: isAtivo ? '#00C853' : '#666',
                  fontSize: 10,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
              color: isDark ? '#666' : '#888',
              fontSize: 12,
            }) as DynamicStyle,
  inline3: ({ isAtivo }: DynamicStyleParams) => ({
                color: isAtivo ? '#00C853' : '#666',
                fontWeight: 'bold',
              }) as DynamicStyle,
};
