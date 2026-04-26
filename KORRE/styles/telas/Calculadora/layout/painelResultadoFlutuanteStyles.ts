import { Platform, StyleSheet } from 'react-native';
import { alpha, palette, radius, spacing, typography } from '../../../tokens';

export const painelResultadoFlutuanteStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopLeftRadius: radius.xxl + spacing.xs,
    borderTopRightRadius: radius.xxl + spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: { elevation: 20 },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: alpha.brand10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.extrabold,
  },
  divider: {
    width: 1,
    height: 30,
    marginHorizontal: 15,
  },
  efficiencyBadge: {
    backgroundColor: palette.brand,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  efficiencyText: {
    color: palette.white,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
  },
});

