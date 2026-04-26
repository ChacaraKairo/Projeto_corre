import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        backgroundColor: '#161616',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
  inline2: { flex: 1, marginRight: 10 },
  inline3: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 14,
          },
  inline4: { color: '#888', fontSize: 12 },
  inline5: {
          backgroundColor: '#00C853',
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
  inline6: {
                color: '#0A0A0A',
                fontWeight: 'bold',
              },
});
