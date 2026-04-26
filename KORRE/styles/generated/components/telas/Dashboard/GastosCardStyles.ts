import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161616',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#222',
    width: '100%',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtn: {
    backgroundColor: '#F44336',
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 20,
  },
  label: {
    color: '#666',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  value: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
});
