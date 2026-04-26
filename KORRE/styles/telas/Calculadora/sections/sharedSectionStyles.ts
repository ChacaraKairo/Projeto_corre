import { StyleSheet } from 'react-native';
import { spacing } from '../../../tokens';

export const sharedSectionStyles = StyleSheet.create({
  fieldStack: {
    gap: spacing.md,
  },
  flex1: {
    flex: 1,
  },
  subsectionTitle: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
});
