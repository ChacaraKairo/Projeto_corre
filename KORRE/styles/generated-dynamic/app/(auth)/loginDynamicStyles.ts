type DynamicStyle = any;
type DynamicStyleParams = Record<string, any>;

export const dynamicInlineStyles = {
  inline1: ({ bounceAnim }: DynamicStyleParams) => ({
              alignItems: 'center',
              marginTop: 60,
              marginBottom: 30,
              transform: [{ translateY: bounceAnim }],
            }) as DynamicStyle,
  inline2: ({ lembrarSenha }: DynamicStyleParams) => ({
                width: 20,
                height: 20,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#00C853',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                backgroundColor: lembrarSenha
                  ? '#00C853'
                  : 'transparent',
              }) as DynamicStyle,
};
