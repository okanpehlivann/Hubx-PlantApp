import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@constants';

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: COLORS.borderStrong,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithVoice: {
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingVertical: 0,
    paddingRight: 4,
    color: COLORS.textPrimary,
    fontFamily: FONTS.rubik.regular,
    fontSize: 15.5,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
  clearButton: {
    width: 40,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    width: 44,
    height: 44,
    marginLeft: 8,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0.2,
    borderColor: COLORS.borderStrong,
    position: 'relative',
  },
  voiceButtonActive: {
    backgroundColor: 'rgba(40, 175, 110, 0.2)',
    borderColor: COLORS.primary,
    borderWidth: 1.2,
  },
  voicePulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  voiceListeningDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5493D',
  },
});

export default styles;
