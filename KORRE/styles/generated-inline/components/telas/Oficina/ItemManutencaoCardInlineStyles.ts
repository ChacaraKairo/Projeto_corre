import { StyleSheet } from 'react-native';

export const inlineStyles = StyleSheet.create({
  inline2: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          },
});

export const itemManutencaoCardDynamicStyles = {
  statusBadge: (color: string) => ({
    backgroundColor: `${color}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${color}30`,
  }),
};
