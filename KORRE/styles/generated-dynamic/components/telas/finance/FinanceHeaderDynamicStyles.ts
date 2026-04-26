type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ mainColor }: DynamicStyleParams) => ({ color: mainColor }),
};
