import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: { fontSize: 18, fontWeight: '900', flexShrink: 1 },
  closeButton: { padding: 8, borderRadius: 12 },
  body: { marginBottom: 20 },
  text: { fontSize: 14, lineHeight: 22 },
  btnOk: {
    backgroundColor: '#00C853',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnOkText: {
    color: '#0A0A0A',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
});
