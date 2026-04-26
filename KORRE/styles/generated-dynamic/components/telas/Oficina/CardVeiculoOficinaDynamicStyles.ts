type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
              padding: 10,
              backgroundColor: isDark ? '#111' : '#F5F5F5',
              borderRadius: 12,
              marginRight: 12,
              borderWidth: 1,
              borderColor: isDark ? '#333' : '#E0E0E0',
            }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
              color: isDark ? '#FFF' : '#000',
              fontSize: 16,
              fontWeight: '900',
            }) as DynamicStyle,
  inline3: ({ statusResumo }: DynamicStyleParams) => ({
              backgroundColor: statusResumo.bg,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: statusResumo.cor,
            }) as DynamicStyle,
  inline4: ({ statusResumo }: DynamicStyleParams) => ({
                color: statusResumo.cor,
                fontSize: 10,
                fontWeight: '900',
                textTransform: 'uppercase',
              }) as DynamicStyle,
};
