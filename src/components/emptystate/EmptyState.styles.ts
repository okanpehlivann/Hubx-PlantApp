import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl * 1.5,
  },
  illustration: {
    width: 112,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  illustrationCircle: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: COLORS.primaryTint,
    borderWidth: 1,
    borderColor: COLORS.categoryBorder,
  },
  leaf: {
    position: 'absolute',
    width: 22,
    height: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    opacity: 0.72,
  },
  leftLeaf: {
    left: 8,
    bottom: 13,
    transform: [{ rotate: '-32deg' }],
  },
  rightLeaf: {
    right: 7,
    top: 11,
    transform: [{ rotate: '32deg' }],
  },
  title: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 280,
    marginTop: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default styles;
