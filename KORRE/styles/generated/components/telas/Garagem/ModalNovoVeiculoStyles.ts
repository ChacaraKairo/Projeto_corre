import { StyleSheet } from 'react-native';

export const localStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  container: { height: '85%' },
  content: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  btnClose: {
    padding: 8,
    backgroundColor: '#222',
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#00C853',
    letterSpacing: 1,
  },
  gridTipos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  btnTipo: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  btnTipoAtivo: {
    borderColor: '#00C853',
    backgroundColor: 'rgba(0,200,83,0.05)',
  },
  txtTipo: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  row: { flexDirection: 'row', gap: 12 },
  btnSave: {
    backgroundColor: '#00C853',
    height: 60,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  btnSaveText: { fontWeight: '900', color: '#0A0A0A' },
  // Pop-up Styles
  popOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'flex-end',
  },
  popContent: {
    backgroundColor: '#161616',
    height: '70%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  popHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  popTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popItem: {
    padding: 16,
    backgroundColor: '#222',
    borderRadius: 12,
    marginBottom: 8,
  },
  popConfirmBtn: {
    backgroundColor: '#00C853',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
});
