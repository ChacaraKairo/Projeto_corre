import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    padding: 24,
    gap: 32,
    paddingBottom: 48,
  },

  // INPUTS
  inputsSection: {
    gap: 28,
  },
  inputGroup: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 12,
  },
  inputWrapperGas: {
    borderColor: '#222',
  },
  inputPrefix: {
    fontSize: 18,
    fontWeight: '900',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 36,
    fontWeight: '900',
    padding: 0,
  },

  // RESULT
  resultCard: {
    padding: 32,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
  },
  resultCardEtanol: {
    backgroundColor: 'rgba(0,200,83,0.05)',
    borderColor: 'rgba(0,200,83,0.3)',
  },
  resultCardGas: {
    backgroundColor: 'rgba(234,179,8,0.05)',
    borderColor: 'rgba(234,179,8,0.3)',
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    marginBottom: 24,
  },
  resultDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  resultStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  resultStat: {
    alignItems: 'center',
    gap: 4,
  },
  resultStatLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#444',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  resultVerticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  // EMPTY
  emptyCard: {
    padding: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#222',
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 22,
  },

  // INFO BOX
  infoBox: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#161616',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  infoIconWrap: {
    padding: 10,
    backgroundColor: 'rgba(0,200,83,0.1)',
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
  },
  infoHighlight: {
    color: '#00C853',
    fontWeight: '900',
  },
});
