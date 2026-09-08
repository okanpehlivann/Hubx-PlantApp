import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 300,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});

export default styles;
