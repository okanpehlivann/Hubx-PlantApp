import { ViewStyle } from 'react-native';
import { RadioCard } from './RadioCard';

export interface RadioCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  badge?: string;
  style?: ViewStyle;
}

export default RadioCard;
