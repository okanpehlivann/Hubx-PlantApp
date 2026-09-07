import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  greetingTitle: {
    flexShrink: 1,
  },
  weatherIcon: {
    marginLeft: SPACING.sm,
  },
  searchInput: {
    marginBottom: SPACING.lg,
  },
  premiumCard: {
    minHeight: 64,
    borderRadius: 12,
    backgroundColor: COLORS.premiumBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  premiumTitle: {
    fontFamily: FONTS.sfProText.bold,
    color: COLORS.premiumTitle,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  premiumDescription: {
    fontFamily: FONTS.sfProText.regular,
    color: COLORS.premiumDescription,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
  },
});

export default styles;
