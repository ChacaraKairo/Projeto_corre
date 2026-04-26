type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
                    color: isDark ? '#888' : '#555',
                    fontWeight: 'bold',
                    marginRight: 4,
                  }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
                    color: isDark ? '#00C853' : '#00A040',
                    fontSize: 20,
                    fontWeight: '900',
                    padding: 0,
                    flex: 1,
                  }) as DynamicStyle,
  inline3: ({ isDark }: DynamicStyleParams) => ({
                  color: isDark ? '#FFFFFF' : '#000000',
                  fontSize: 18,
                  fontWeight: '900',
                }) as DynamicStyle,
};
