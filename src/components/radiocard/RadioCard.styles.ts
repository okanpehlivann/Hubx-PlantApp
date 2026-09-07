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
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.textOnDarkFaded,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
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
