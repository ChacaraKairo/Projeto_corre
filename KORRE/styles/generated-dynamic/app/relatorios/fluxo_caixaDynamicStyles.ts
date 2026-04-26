type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ tipoVisao, cardColor, borderColor }: DynamicStyleParams) => ({
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                tipoVisao === 'mensal'
                  ? '#00C853'
                  : cardColor,
              marginRight: 8,
              borderWidth: 1,
              borderColor:
                tipoVisao === 'mensal'
                  ? '#00C853'
                  : borderColor,
            }) as DynamicStyle,
  inline2: ({ tipoVisao, textMuted }: DynamicStyleParams) => ({
                color:
                  tipoVisao === 'mensal'
                    ? '#0A0A0A'
                    : textMuted,
                fontWeight: 'bold',
                fontSize: 12,
              }) as DynamicStyle,
  inline3: ({ tipoVisao, cardColor, borderColor }: DynamicStyleParams) => ({
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                tipoVisao === 'semanal'
                  ? '#00C853'
                  : cardColor,
              borderWidth: 1,
              borderColor:
                tipoVisao === 'semanal'
                  ? '#00C853'
                  : borderColor,
            }) as DynamicStyle,
  inline4: ({ tipoVisao, textMuted }: DynamicStyleParams) => ({
                color:
                  tipoVisao === 'semanal'
                    ? '#0A0A0A'
                    : textMuted,
                fontWeight: 'bold',
                fontSize: 12,
              }) as DynamicStyle,
  inline5: ({ textMuted }: DynamicStyleParams) => ({
                    color: textMuted,
                    textAlign: 'center',
                  }) as DynamicStyle,
};
