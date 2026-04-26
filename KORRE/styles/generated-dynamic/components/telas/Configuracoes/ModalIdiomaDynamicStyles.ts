type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ cardColor, borderColor }: DynamicStyleParams) => ({
            width: '100%',
            backgroundColor: cardColor,
            borderRadius: 24,
            padding: 20,
            borderWidth: 1,
            borderColor,
          }) as DynamicStyle,
  inline2: ({ isDark }: DynamicStyleParams) => ({
              fontSize: 18,
              fontWeight: 'bold',
              color: isDark ? '#FFF' : '#000',
              marginBottom: 20,
              textAlign: 'center',
            }) as DynamicStyle,
  inline3: ({ borderColor }: DynamicStyleParams) => ({
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: borderColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }) as DynamicStyle,
  inline4: ({ i18n, lang, isDark }: DynamicStyleParams) => ({
                  fontSize: 16,
                  color:
                    i18n.language === lang.code
                      ? '#00C853'
                      : isDark
                        ? '#FFF'
                        : '#000',
                }) as DynamicStyle,
};
