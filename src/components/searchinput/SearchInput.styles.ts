import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: COLORS.borderStrong,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 0,
    paddingRight: 4,
    color: COLORS.textPrimary,
    fontFamily: FONTS.rubik.regular,
    fontSize: 15.5,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
  clearButton: {
    width: 40,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
