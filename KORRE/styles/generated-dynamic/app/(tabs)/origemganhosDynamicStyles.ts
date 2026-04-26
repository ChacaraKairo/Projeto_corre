type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ cardColor, isDark, borderColor }: DynamicStyleParams) => ({
            flexDirection: 'row',
            padding: 20,
            backgroundColor: cardColor,
            margin: 20,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: isDark ? 0 : 1,
            borderColor: borderColor,
          }) as DynamicStyle,
  inline2: ({ textMuted }: DynamicStyleParams) => ({
              color: textMuted,
              marginLeft: 10,
              flex: 1,
              fontSize: 12,
            }) as DynamicStyle,
  inline3: ({ isDark, cardColor, borderColor }: DynamicStyleParams) => ({
          padding: 20,
          borderTopWidth: 1,
          borderColor: isDark ? cardColor : borderColor,
        }) as DynamicStyle,
};
