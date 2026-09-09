import { StyleSheet } from 'react-native';
import { SPACING } from '@constants';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  card: {
    width: 240,
    height: 160,
    borderRadius: 16,
  },
});

export default styles;
