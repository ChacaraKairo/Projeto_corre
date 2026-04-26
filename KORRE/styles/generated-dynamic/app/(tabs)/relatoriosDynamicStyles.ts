type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
                fontWeight: 'bold',
                color: isDark ? '#FFF' : '#000',
              }) as DynamicStyle,
};
