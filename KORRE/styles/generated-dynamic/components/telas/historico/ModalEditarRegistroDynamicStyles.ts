type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ textColor }: DynamicStyleParams) => ({
                color: textColor,
                fontSize: 18,
                fontWeight: 'bold',
              }) as DynamicStyle,
};
