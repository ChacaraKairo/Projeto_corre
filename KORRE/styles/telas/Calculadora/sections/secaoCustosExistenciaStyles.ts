import { StyleSheet } from 'react-native';
import { alpha, palette, radius, spacing, typography } from '../../../tokens';

export const secaoCustosExistenciaStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  autoButton: {
    height: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: palette.brand,
    marginBottom: 0,
  },
  autoButtonText: {
    fontSize: typography.size.xs + 1,
    fontWeight: typography.weight.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: alpha.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
    borderRadius: radius.xl,
    padding: spacing.xl,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
  },
  ufButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ufButtonText: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
});

