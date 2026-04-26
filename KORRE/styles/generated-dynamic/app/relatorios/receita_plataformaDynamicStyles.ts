type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ cardColor, borderColor }: DynamicStyleParams) => ({
                  alignItems: 'center',
                  marginBottom: 24,
                  backgroundColor: cardColor,
                  borderRadius: 24,
                  paddingVertical: 16,
                  borderWidth: 1,
                  borderColor,
                }) as DynamicStyle,
  inline2: ({ textColor }: DynamicStyleParams) => ({
                    color: textColor,
                    fontWeight: 'bold',
                    marginBottom: 8,
                  }) as DynamicStyle,
  inline3: ({ textMuted }: DynamicStyleParams) => ({
                    color: textMuted,
                    textAlign: 'center',
                  }) as DynamicStyle,
  inline4: ({ textMuted }: DynamicStyleParams) => ({
                              color: textMuted,
                              fontSize: 12,
                              marginTop: 2,
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
};
