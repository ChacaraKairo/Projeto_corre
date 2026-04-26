type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ textMuted }: DynamicStyleParams) => ({ fontSize: 14, color: textMuted }),
  inline2: ({ item }: DynamicStyleParams) => ({
                fontSize: 24,
                fontWeight: '900',
                color:
                  item.tipo === 'ganho'
                    ? '#00C853'
                    : '#EF4444',
              }) as DynamicStyle,
};
