type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ textMuted }: DynamicStyleParams) => ({
              color: textMuted,
              fontSize: 12,
              fontWeight: 'bold',
            }) as DynamicStyle,
};
