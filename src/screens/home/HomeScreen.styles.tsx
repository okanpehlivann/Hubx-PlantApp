import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl * 2,
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
    marginHorizontal: SPACING.lg,
  },
  searchArea: {
    height: 73,
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: -SPACING.lg,
    marginBottom: SPACING.lg,
  },
  searchBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  premiumCard: {
    height: 64,
    minHeight: 64,
    borderRadius: 12,
    backgroundColor: COLORS.premiumBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: 0,
    marginBottom: SPACING.sm,
  },
  premiumIcon: {
    marginTop: SPACING.xs,
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
  sectionTitle: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  questionsList: {
    marginHorizontal: -SPACING.lg,
    marginBottom: SPACING.xl,
  },
  questionsContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  questionCard: {
    aspectRatio: 1.5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    height: 178,
    marginBottom: SPACING.md,
  },
  lastCategoryCard: {
    marginBottom: 0,
  },
  sectionState: {
    flex: 0,
    minHeight: 120,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  skeletonQuestionsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  skeletonQuestionCard: {
    width: 240,
    height: 160,
    borderRadius: 16,
  },
  skeletonCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  skeletonCategoryCard: {
    width: '47%',
    height: 178,
    borderRadius: 16,
  },
});

export default styles;
