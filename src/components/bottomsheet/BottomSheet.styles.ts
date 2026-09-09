import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.overlayBlack,
  },
  backdropTouchTarget: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    maxHeight: '82%',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    marginBottom: SPACING.lg,
    borderRadius: 2,
    backgroundColor: COLORS.borderStrong,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  contentScroll: {
    flexShrink: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.lg,
  },
});

export default styles;
