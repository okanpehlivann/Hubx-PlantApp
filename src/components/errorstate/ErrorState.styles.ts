import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  icon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: COLORS.errorBackground,
  },
  iconText: {
    color: COLORS.error,
    fontSize: 28,
    fontWeight: '700',
  },
  message: {
    marginTop: SPACING.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});

export default styles;
