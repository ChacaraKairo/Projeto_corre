import { StyleSheet } from 'react-native';

export const localStyles = StyleSheet.create({
  segmentedContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
    padding: 4,
    height: 45,
  },
  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
