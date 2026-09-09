import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '@constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.62,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  panel: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  subheading: {
    marginTop: 2,
    marginBottom: 16,
  },
  featuresScroll: {
    height: 128,
    flexGrow: 0,
    marginBottom: 16,
    marginHorizontal: -20,
  },
  featuresRow: {
    paddingHorizontal: 20,
  },
  featureCard: {
    width: 156,
    height: 130,
    marginRight: 8,
    backgroundColor: COLORS.surfaceDarkElevated,
    borderRadius: 14,
    padding: 16,
    justifyContent: 'space-between',
  },
  planCard: {
    marginBottom: 8,
  },
  ctaButton: {
    marginTop: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: SPACING.xs,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  linkDivider: {
    marginHorizontal: 8,
  },
});

export default styles;
