import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  touchGuard: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  overlayGraphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tooltip: {
    position: 'absolute',
    left: SPACING.md,
    right: SPACING.md,
    padding: SPACING.lg,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  tooltipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  stepLabel: {
    color: COLORS.primary,
    fontFamily: FONTS.rubik.medium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.rubik.medium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.rubik.medium,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.rubik.regular,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.borderStrong,
  },
  progressDotActive: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  nextButton: {
    minWidth: 88,
    height: 44,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  nextButtonText: {
    color: COLORS.textOnDark,
    fontFamily: FONTS.rubik.medium,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default styles;
