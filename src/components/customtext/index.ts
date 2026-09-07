import { CustomText } from './CustomText';
import { TextProps, TextStyle } from 'react-native';

export type CustomTextVariant =
  | 'regular'
  | 'medium'
  | 'bold'
  | 'extraBold'
  | 'light';

export interface CustomTextProps extends TextProps {
  variant?: CustomTextVariant;
  size?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
  letterSpacing?: TextStyle['letterSpacing'];
  color?: TextStyle['color'];
}

export default CustomText;
