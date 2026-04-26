type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
              padding: 8,
              backgroundColor: isDark ? '#161616' : '#FFF',
              borderRadius: 12,
            }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
              color: isDark ? '#FFF' : '#000',
              fontSize: 20,
              fontWeight: '900',
            }) as DynamicStyle,
  inline3: ({ isDark, notif }: DynamicStyleParams) => ({
                flexDirection: 'row',
                backgroundColor: isDark
                  ? '#161616'
                  : '#FFF',
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: isDark ? '#222' : '#E0E0E0',
                opacity: notif.lida ? 0.6 : 1, // Fica mais transparente se já foi lida
              }) as DynamicStyle,
  inline4: ({ isDark }: DynamicStyleParams) => ({
                    color: isDark ? '#FFF' : '#000',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }) as DynamicStyle,
  inline5: ({ isDark }: DynamicStyleParams) => ({
                    color: isDark ? '#888' : '#555',
                    fontSize: 14,
                  }) as DynamicStyle,
};
