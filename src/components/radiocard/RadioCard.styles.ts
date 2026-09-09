import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderOnDark,
    backgroundColor: COLORS.surfaceDark,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryTint,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surfaceDarkElevated,
  },
  radioSelected: {
    backgroundColor: COLORS.primary,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textOnDark,
  },
  textWrapper: {
    flex: 1,
    marginLeft: SPACING.sm / 2,
  },
  description: {
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm * 1.5,
    paddingVertical: 5,
    borderBottomLeftRadius: 20,
  },
});

export default styles;
