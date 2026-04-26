type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isDark }: DynamicStyleParams) => ({
              backgroundColor: isDark
                ? '#161616'
                : '#FFFFFF',
              borderRadius: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: isDark ? '#333' : '#E0E0E0',
              maxHeight: '80%',
            }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: isDark ? '#FFF' : '#000',
                }) as DynamicStyle,
  inline3: ({ isDark }: DynamicStyleParams) => ({
                  padding: 8,
                  backgroundColor: isDark
                    ? '#222'
                    : '#F5F5F5',
                  borderRadius: 12,
                }) as DynamicStyle,
  inline4: ({ isAtivo, isDark }: DynamicStyleParams) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      marginBottom: 12,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: isAtivo
                        ? '#00C853'
                        : isDark
                          ? '#333'
                          : '#E0E0E0',
                      backgroundColor: isAtivo
                        ? 'rgba(0,200,83,0.1)'
                        : isDark
                          ? '#0A0A0A'
                          : '#F5F5F5',
                    }) as DynamicStyle,
  inline5: ({ isDark }: DynamicStyleParams) => ({
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: isDark
                          ? '#161616'
                          : '#FFF',
                        marginRight: 12,
                      }) as DynamicStyle,
  inline6: ({ isDark }: DynamicStyleParams) => ({
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: isDark ? '#FFF' : '#000',
                        }) as DynamicStyle,
  inline7: ({ isDark }: DynamicStyleParams) => ({
                          fontSize: 12,
                          color: isDark ? '#888' : '#555',
                        }) as DynamicStyle,
};
