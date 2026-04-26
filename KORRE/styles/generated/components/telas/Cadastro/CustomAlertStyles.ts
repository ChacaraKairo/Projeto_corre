import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Um pouco mais escuro para destaque
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#1E1E1E', // Tom mais próximo do seu app
    padding: 24,
    borderRadius: 20,
    width: '85%',
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: '#00C853', // Verde padrão do app
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#00C853',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonDestructive: {
    backgroundColor: '#FF5252',
  },
  buttonText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonTextCancel: {
    color: '#999',
  },
});
