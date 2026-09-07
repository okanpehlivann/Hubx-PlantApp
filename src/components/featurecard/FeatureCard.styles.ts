import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceDarkElevated,
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.overlayBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
  },
  description: {
    marginTop: 2,
  },
});

export default styles;
