type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
              padding: 8,
              backgroundColor: isDark
                ? '#0A0A0A'
                : '#F5F5F5',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isDark ? '#333' : '#E0E0E0',
            }) as DynamicStyle,
};
