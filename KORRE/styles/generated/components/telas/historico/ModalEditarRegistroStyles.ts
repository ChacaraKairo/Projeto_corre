import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: { fontSize: 20, fontWeight: '900' },
  label: { color: '#888', marginBottom: 8, fontSize: 13 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    minHeight: 60,
  },
  btnSave: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    padding: 18,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnSaveText: {
    fontWeight: '900',
    color: '#0A0A0A',
    marginLeft: 8,
    fontSize: 16,
  },
});
