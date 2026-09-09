import { SPACING, COLORS } from '@constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    minHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: 0,
  },
  artworkFrame: {
    overflow: 'hidden',
  },
  list: {
    flex: 1,
    minHeight: 0,
  },
  slide: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  phoneImage: {
    position: 'absolute',
    aspectRatio: 872 / 1804,
  },
  artwork: {
    position: 'absolute',
    top: 8,
    right: '5%',
    width: '38%',
    aspectRatio: 233 / 255,
  },
  slideHeader: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  buttonContainer: {
    width: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.textPrimary,
  },
});

export default styles;
