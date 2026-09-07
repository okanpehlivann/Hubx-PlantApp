import { CustomButton } from './CustomButton';
import { ViewStyle, TextStyle } from 'react-native';

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

export default CustomButton;
