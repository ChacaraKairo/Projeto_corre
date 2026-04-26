import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { color: '#9CA3AF', fontSize: 14 },
  value: { color: '#FFF', fontWeight: 'bold' },
  progressBg: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subLabel: { color: '#9CA3AF' },
  lucroValue: { fontWeight: 'bold', fontSize: 16 },
});
