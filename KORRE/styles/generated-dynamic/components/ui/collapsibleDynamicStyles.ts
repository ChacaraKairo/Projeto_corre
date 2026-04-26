type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ isOpen }: DynamicStyleParams) => ({ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }),
};
