type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
              padding: 8,
              backgroundColor: isDark
                ? '#202020'
                : '#F5F5F5',
              borderRadius: 12,
            }) as DynamicStyle,
};
