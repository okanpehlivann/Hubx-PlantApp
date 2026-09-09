import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CommonCard } from './CommonCard';

export interface CommonCardProps {
  icon?: ReactNode;
  arrowIcon?: ReactNode;
  title: string;
  description?: string;
  showArrow?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  titleGradientColors?: readonly [string, string];
  descriptionStyle?: StyleProp<TextStyle>;
}

export default CommonCard;
