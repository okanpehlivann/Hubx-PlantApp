import type { StyleProp, TextStyle } from 'react-native';
import GradientText from './GradientText';

export interface GradientTextProps {
  children: string;
  colors: readonly [string, string];
  style?: StyleProp<TextStyle>;
}

export { GradientText };
export default GradientText;
