import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline1: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            padding: 20,
          },
  inline2: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              },
  inline3: { flex: 1 },
});
