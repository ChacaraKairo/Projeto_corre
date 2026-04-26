type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ textColor }: DynamicStyleParams) => ({
                      color: textColor,
                      marginLeft: 8,
                    }) as DynamicStyle,
  inline2: ({ textColor }: DynamicStyleParams) => ({
                      color: textColor,
                      marginLeft: 8,
                    }) as DynamicStyle,
};
