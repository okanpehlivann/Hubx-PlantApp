import { QuestionCard } from './QuestionCard';
import type { StyleProp, ViewStyle } from 'react-native';

export interface QuestionCardProps {
  title: string;
  imageUri: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export { QuestionCard };
export default QuestionCard;
