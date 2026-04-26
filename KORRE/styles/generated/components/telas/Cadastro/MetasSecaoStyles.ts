import { StyleSheet } from 'react-native';

export const localStyles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderRadius: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#00C853',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  toggleTextActive: {
    color: '#0A0A0A',
  },
  obsText: {
    fontSize: 10,
    color: '#444',
    marginTop: -8,
    marginLeft: 4,
    fontStyle: 'italic',
  },
});
