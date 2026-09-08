import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  contentInner: {
    width: '100%',
    alignItems: 'center',
  },
  logoArea: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  pulseRing: {
    position: 'absolute',
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  logoBadge: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44,
    backgroundColor: COLORS.primaryTint,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
  },
  title: {
    fontFamily: FONTS.rubik.extraBold,
    textAlign: 'center',
  },
  message: {
    maxWidth: 320,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  homeButton: {
    maxWidth: 327,
    marginTop: SPACING.xl,
  },
});

export default styles;
