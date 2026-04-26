import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: {
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(0, 200, 83, 0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
  inline2: { flex: 1, marginLeft: 12 },
  inline3: { flexShrink: 0, marginTop: 2 },
  inline4: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          },
  inline5: {
                alignItems: 'flex-end',
                justifyContent: 'center',
              },
  inline6: {
                  color: '#888',
                  fontSize: 8,
                  fontWeight: 'bold',
                  marginBottom: 2,
                  textTransform: 'uppercase',
                },
  inline7: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                },
  inline8: {
                    color: '#FFF',
                    fontSize: 11,
                    fontWeight: '900',
                  },
  inline9: {
                      color: '#03A9F4',
                      fontSize: 9,
                      fontWeight: 'bold',
                      marginTop: 2,
                    },
});
