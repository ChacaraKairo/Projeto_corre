type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ bgColor }: DynamicStyleParams) => ({
            backgroundColor: bgColor,
            paddingVertical: 10,
          }) as DynamicStyle,
  inline2: ({ textMuted }: DynamicStyleParams) => ({
                  color: textMuted,
                  textAlign: 'center',
                }) as DynamicStyle,
  inline3: ({ textMuted }: DynamicStyleParams) => ({
                    color: textMuted,
                    fontSize: 12,
                    marginTop: 2,
                  }) as DynamicStyle,
  inline4: ({ textMuted }: DynamicStyleParams) => ({
                  color: textMuted,
                  fontWeight: 'bold',
                }) as DynamicStyle,
  inline5: ({ textMuted }: DynamicStyleParams) => ({
                  color: textMuted,
                  fontWeight: 'bold',
                }) as DynamicStyle,
  inline6: ({ textMuted }: DynamicStyleParams) => ({
                  color: textMuted,
                  fontWeight: 'bold',
                }) as DynamicStyle,
  inline7: (params: DynamicStyleParams) => ({
              position: 'absolute',
              // Jogamos o modal para fora da tela em vez de opacity 0.
              // Isso garante que o motor do Android desenhe as Logos perfeitamente!
              left: -10000,
              top: -10000,
            }) as DynamicStyle,
  inline8: ({ layoutParaPrint }: DynamicStyleParams) => ({
                width: 400,
                backgroundColor:
                  layoutParaPrint === 'mecanico'
                    ? '#FFFFFF'
                    : '#0A0A0A',
                padding: 32,
              }) as DynamicStyle,
  inline9: ({ index }: DynamicStyleParams) => ({
                          flexDirection: 'row',
                          paddingVertical: 12,
                          paddingHorizontal: 12,
                          backgroundColor:
                            index % 2 === 0
                              ? '#FFF'
                              : '#F9F9F9',
                          borderBottomWidth: 1,
                          borderBottomColor: '#EEE',
                          alignItems: 'center',
                        }) as DynamicStyle,
};
