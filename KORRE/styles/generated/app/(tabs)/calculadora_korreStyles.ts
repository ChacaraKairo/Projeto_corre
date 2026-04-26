import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: { paddingBottom: 120 }, // Espaço para o Painel Flutuante
  formContainer: { padding: 20, gap: 8 },
  buttonWrapper: { marginTop: 10, marginBottom: 20 },
});
