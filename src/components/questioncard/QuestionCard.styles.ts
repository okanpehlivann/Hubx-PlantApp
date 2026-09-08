import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: COLORS.questionCardBackground,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  title: {
    color: COLORS.textOnDark,
    fontFamily: FONTS.rubik.regular,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.24,
  },
});

export default styles;
