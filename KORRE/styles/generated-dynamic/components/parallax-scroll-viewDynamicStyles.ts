type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ backgroundColor }: DynamicStyleParams) => ({ backgroundColor, flex: 1 }),
};
