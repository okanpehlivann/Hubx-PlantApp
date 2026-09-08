import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  shimmer: {
    width: 120,
    height: '140%',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    transform: [{ rotate: '18deg' }],
  },
});

export default styles;
