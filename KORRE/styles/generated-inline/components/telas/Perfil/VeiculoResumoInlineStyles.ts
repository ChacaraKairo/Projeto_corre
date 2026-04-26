import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: { marginBottom: 24 },
  inline2: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          },
  inline3: { flex: 1 },
  inline4: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          },
  inline5: {
              padding: 8,
              backgroundColor: 'rgba(0, 200, 83, 0.1)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(0, 200, 83, 0.3)',
            },
});
