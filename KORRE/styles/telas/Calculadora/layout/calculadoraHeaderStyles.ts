import { StyleSheet } from 'react-native';
import { alpha, palette, radius, spacing, typography } from '../../../tokens';

export const calculadoraHeaderStyles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: spacing.xxxl,
    borderBottomRightRadius: spacing.xxxl,
    elevation: 4,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(120, 120, 120, 0.1)',
  },
  title: {
    fontSize: 22,
    fontWeight: typography.weight.extrabold,
  },
  subtitle: {
    fontSize: typography.size.md,
  },
  selectorContainer: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  scrollContent: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  veiculoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  veiculoChipActive: {
    borderColor: palette.brand,
    backgroundColor: alpha.brand10,
  },
  veiculoText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  progressSection: {
    marginTop: spacing.sm,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  progressBg: {
    height: spacing.sm,
    borderRadius: radius.xs,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: palette.brand,
    borderRadius: radius.xs,
  },
  helperText: {
    fontSize: typography.size.xs + 1,
    marginTop: 6,
    fontStyle: 'italic',
  },
});

