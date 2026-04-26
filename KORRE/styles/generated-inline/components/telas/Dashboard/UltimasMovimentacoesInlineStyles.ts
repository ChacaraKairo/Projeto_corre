import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: { marginTop: 24, paddingBottom: 100 },
  inline2: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        },
  inline3: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          },
  inline4: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                },
});
