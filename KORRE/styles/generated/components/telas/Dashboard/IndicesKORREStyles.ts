import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  trindadeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 16,
    marginBottom: 16, // Um pouco mais de espaço antes da barra inferior
  },
  indiceBoxTrindade: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center', // Centraliza tudo para economizar espaço
    justifyContent: 'center',
    gap: 4, // Espaçamento suave entre ícone, título e valor
  },
  labelTrindade: {
    fontSize: 10,
    textAlign: 'center',
  },
  valueTrindade: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },
  hourlyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
});
