import { StyleSheet } from 'react-native';
import { COLORS } from '@constants';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    columnGap: 7,
    rowGap: 3,
    paddingBottom: 13,
  },
  word: {
    maxWidth: '100%',
  },
  highlight: {
    position: 'relative',
    maxWidth: '100%',
  },
  brush: {
    position: 'absolute',
    bottom: -13,
    left: 0,
    width: '100%',
    height: 13,
  },
  shadow: {
    textShadowColor: COLORS.textShadow,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 3,
  },
});

export default styles;
