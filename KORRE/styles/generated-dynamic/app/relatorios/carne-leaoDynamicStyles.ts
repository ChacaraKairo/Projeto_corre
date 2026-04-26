type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ pago }: DynamicStyleParams) => ({ height: pago ? 32 : 120 }),
};
