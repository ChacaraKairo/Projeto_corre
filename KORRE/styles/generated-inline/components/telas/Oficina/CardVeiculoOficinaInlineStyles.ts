import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          },
  inline2: { flex: 1 },
  inline3: { flex: 1 },
  inline4: {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginBottom: 2,
            },
  inline5: {
                color: '#444',
                fontSize: 8,
                fontWeight: '900',
                textTransform: 'uppercase',
              },
  inline6: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          },
});
