import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  light: {
    fontFamily: FONTS.rubik.light,
    fontWeight: '300',
    color: COLORS.textPrimary,
  },
  regular: {
    fontFamily: FONTS.rubik.regular,
    fontWeight: '400',
    color: COLORS.textPrimary,
  },
  medium: {
    fontFamily: FONTS.rubik.medium,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  bold: {
    fontFamily: FONTS.rubik.bold,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  extraBold: {
    fontFamily: FONTS.rubik.extraBold,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
});

export default styles;
