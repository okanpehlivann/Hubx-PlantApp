import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: COLORS.textOnDark,
    fontFamily: FONTS.sfProText.bold,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.24,
    lineHeight: 24,
  },
});

export default styles;
