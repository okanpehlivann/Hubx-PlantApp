import { StyleSheet } from 'react-native';
import { SPACING } from '@constants';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  card: {
    width: '47%',
    height: 178,
    borderRadius: 16,
  },
});

export default styles;
