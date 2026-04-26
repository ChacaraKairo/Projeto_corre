import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardGanhos: {
    backgroundColor: '#161616',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
    width: '100%',
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconeGanhoBg: {
    backgroundColor: 'rgba(0, 200, 83, 0.1)',
    padding: 12,
    borderRadius: 16,
  },
  btnPlusSmall: {
    backgroundColor: '#00C853',
    padding: 6,
    borderRadius: 10,
  },
  metaContainer: {
    alignItems: 'flex-end',
  },
  metaLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelMeta: {
    color: '#666',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  valorMetaRestante: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  mainContent: {
    marginTop: 20,
  },
  labelGanhosHoje: {
    color: '#666',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  valorGanhosBig: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  barraProgressoBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#222',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  barraProgressoFill: {
    height: '100%',
    borderRadius: 4,
  },
  porcentagemTexto: {
    color: '#444',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'right',
    textTransform: 'uppercase',
  },
});
