import { Platform } from 'react-native';

const sfPro = (postscriptName: string, androidFileName: string) =>
  Platform.select({
    ios: postscriptName,
    android: androidFileName,
    default: androidFileName,
  }) as string;

export const FONTS = {
  rubik: {
    light: 'Rubik-Light',
    lightItalic: 'Rubik-LightItalic',
    regular: 'Rubik-Regular',
    italic: 'Rubik-Italic',
    medium: 'Rubik-Medium',
    mediumItalic: 'Rubik-MediumItalic',
    semiBold: 'Rubik-SemiBold',
    semiBoldItalic: 'Rubik-SemiBoldItalic',
    bold: 'Rubik-Bold',
    boldItalic: 'Rubik-BoldItalic',
    extraBold: 'Rubik-ExtraBold',
    extraBoldItalic: 'Rubik-ExtraBoldItalic',
    black: 'Rubik-Black',
    blackItalic: 'Rubik-BlackItalic',
  },
  sfProText: {
    thin: sfPro('SFProText-Thin', 'SF-Pro-Text-Thin'),
    thinItalic: sfPro('SFProText-ThinItalic', 'SF-Pro-Text-ThinItalic'),
    ultralight: sfPro('SFProText-Ultralight', 'SF-Pro-Text-Ultralight'),
    ultralightItalic: sfPro(
      'SFProText-UltralightItalic',
      'SF-Pro-Text-UltralightItalic',
    ),
    light: sfPro('SFProText-Light', 'SF-Pro-Text-Light'),
    lightItalic: sfPro('SFProText-LightItalic', 'SF-Pro-Text-LightItalic'),
    regular: sfPro('SFProText-Regular', 'SF-Pro-Text-Regular'),
    regularItalic: sfPro(
      'SFProText-RegularItalic',
      'SF-Pro-Text-RegularItalic',
    ),
    medium: sfPro('SFProText-Medium', 'SF-Pro-Text-Medium'),
    mediumItalic: sfPro('SFProText-MediumItalic', 'SF-Pro-Text-MediumItalic'),
    semibold: sfPro('SFProText-Semibold', 'SF-Pro-Text-Semibold'),
    semiboldItalic: sfPro(
      'SFProText-SemiboldItalic',
      'SF-Pro-Text-SemiboldItalic',
    ),
    bold: sfPro('SFProText-Bold', 'SF-Pro-Text-Bold'),
    boldItalic: sfPro('SFProText-BoldItalic', 'SF-Pro-Text-BoldItalic'),
    heavy: sfPro('SFProText-Heavy', 'SF-Pro-Text-Heavy'),
    heavyItalic: sfPro('SFProText-HeavyItalic', 'SF-Pro-Text-HeavyItalic'),
    black: sfPro('SFProText-Black', 'SF-Pro-Text-Black'),
    blackItalic: sfPro('SFProText-BlackItalic', 'SF-Pro-Text-BlackItalic'),
  },
} as const;
