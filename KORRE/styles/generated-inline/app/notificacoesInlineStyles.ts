import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          },
  inline2: { padding: 8 },
  inline3: {
          margin: 20,
          padding: 16,
          backgroundColor: '#00C853',
          borderRadius: 16,
          alignItems: 'center',
        },
  inline4: { color: '#0A0A0A', fontWeight: '900' },
  inline5: {
              color: '#666',
              textAlign: 'center',
              marginTop: 40,
            },
  inline6: { marginRight: 16, marginTop: 4 },
  inline7: { flex: 1 },
  listContent: {
          padding: 20,
          paddingBottom: 100,
        },
});
