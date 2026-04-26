import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161616',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: { flex: 1 },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  value: { fontSize: 16, fontWeight: 'bold' },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 16,
  },
  lucroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  labelLucro: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  valueLucro: { fontSize: 20, fontWeight: '900' },
});
