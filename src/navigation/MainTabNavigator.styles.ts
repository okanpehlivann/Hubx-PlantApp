import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    paddingTop: 8,
    paddingBottom: 30,
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0,
    elevation: 0,
    overflow: 'visible',
  },
  tabBarItem: {
    flex: 1,
    paddingTop: 1,
    transform: [{ translateY: -8 }],
  },
  scanTabItem: {
    flex: 1,
    paddingTop: 1,
  },
  tabBarLabel: {
    fontFamily: FONTS.rubik.regular,
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: -0.24,
    marginTop: 4,
  },
  scanTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -45,
  },
  scanButtonOuter: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 41,
    backgroundColor: '#72D2A5',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  scanButtonInner: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: COLORS.primary,
  },
});

export default styles;
