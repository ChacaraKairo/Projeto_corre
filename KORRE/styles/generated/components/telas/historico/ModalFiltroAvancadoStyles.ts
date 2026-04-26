import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    borderTopWidth: 1,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: '900' },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
  },
  chipAtivo: {
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  chipText: { color: '#888', fontWeight: 'bold' },
  chipTextAtivo: { color: '#0A0A0A' },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  catItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  catText: { fontSize: 13, fontWeight: 'bold' },
  btnAplicar: {
    backgroundColor: '#00C853',
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnAplicarText: {
    fontWeight: '900',
    color: '#0A0A0A',
    marginLeft: 8,
  },
});
