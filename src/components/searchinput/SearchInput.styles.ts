import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 52,
    paddingVertical: 0,
    paddingRight: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.rubik.regular,
    fontSize: 15.5,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
});

export default styles;
