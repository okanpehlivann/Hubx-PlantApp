import { SPACING, COLORS } from '@constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  subtitle: {
    marginTop: SPACING.xs,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 0,
    marginTop: SPACING.md,
  },
  artworkFrame: {
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    left: 0,
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  termsText: {
    textAlign: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});

export default styles;
