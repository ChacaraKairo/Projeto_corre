import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#888',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#00C853',
    borderRadius: 12,
    color: '#FFF',
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  btnCancelText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  btnSave: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#00C853',
    alignItems: 'center',
  },
  btnSaveText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
});
