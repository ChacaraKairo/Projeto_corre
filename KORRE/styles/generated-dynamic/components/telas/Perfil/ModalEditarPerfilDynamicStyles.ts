type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ bgColor }: DynamicStyleParams) => ({
            backgroundColor: bgColor,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            padding: 24,
            maxHeight: '90%',
          }) as DynamicStyle,
  inline2: ({ textColor }: DynamicStyleParams) => ({
                color: textColor,
                fontSize: 20,
                fontWeight: '900',
              }) as DynamicStyle,
  inline3: ({ inputBg }: DynamicStyleParams) => ({
                padding: 8,
                backgroundColor: inputBg,
                borderRadius: 16,
              }) as DynamicStyle,
  inline4: ({ inputBg, textColor, borderColor }: DynamicStyleParams) => ({
                backgroundColor: inputBg,
                color: textColor,
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor,
              }) as DynamicStyle,
  inline5: ({ inputBg, textColor, borderColor }: DynamicStyleParams) => ({
                backgroundColor: inputBg,
                color: textColor,
                padding: 16,
                borderRadius: 16,
                marginBottom: 24,
                borderWidth: 1,
                borderColor,
              }) as DynamicStyle,
  inline6: ({ inputBg, borderColor }: DynamicStyleParams) => ({
                flexDirection: 'row',
                backgroundColor: inputBg,
                borderRadius: 16,
                padding: 6,
                marginBottom: 24,
                borderWidth: 1,
                borderColor,
              }) as DynamicStyle,
  inline7: ({ tipoMeta }: DynamicStyleParams) => ({
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor:
                    tipoMeta === 'diaria'
                      ? '#00C853'
                      : 'transparent',
                  alignItems: 'center',
                }) as DynamicStyle,
  inline8: ({ tipoMeta }: DynamicStyleParams) => ({
                    fontWeight: 'bold',
                    color:
                      tipoMeta === 'diaria'
                        ? '#0A0A0A'
                        : '#888',
                  }) as DynamicStyle,
  inline9: ({ tipoMeta }: DynamicStyleParams) => ({
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor:
                    tipoMeta === 'semanal'
                      ? '#00C853'
                      : 'transparent',
                  alignItems: 'center',
                }) as DynamicStyle,
  inline10: ({ tipoMeta }: DynamicStyleParams) => ({
                    fontWeight: 'bold',
                    color:
                      tipoMeta === 'semanal'
                        ? '#0A0A0A'
                        : '#888',
                  }) as DynamicStyle,
  inline11: ({ inputBg, borderColor }: DynamicStyleParams) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: inputBg,
                    padding: 16,
                    borderRadius: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor,
                  }) as DynamicStyle,
  inline12: ({ textColor }: DynamicStyleParams) => ({
                          color: textColor,
                          fontWeight: 'bold',
                        }) as DynamicStyle,
  inline13: ({ loading }: DynamicStyleParams) => ({
              backgroundColor: '#00C853',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 18,
              borderRadius: 20,
              marginTop: 16,
              gap: 8,
              opacity: loading ? 0.7 : 1,
            }) as DynamicStyle,
};
