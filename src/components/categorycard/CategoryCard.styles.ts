import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 0.7,
    borderColor: COLORS.categoryBorder,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    zIndex: 1,
    maxWidth: '75%',
    color: COLORS.textPrimary,
    fontFamily: FONTS.rubik.medium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
});

export default styles;
