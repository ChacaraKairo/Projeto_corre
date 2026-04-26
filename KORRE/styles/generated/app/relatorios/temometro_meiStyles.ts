import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  headerTextContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
  },
  subTitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#DBEAFE',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 18,
  },
  placeholderCard: {
    padding: 25,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
});
