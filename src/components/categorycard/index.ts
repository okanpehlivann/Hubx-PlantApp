import { CategoryCard } from './CategoryCard';
import type { StyleProp, ViewStyle } from 'react-native';

export interface CategoryCardProps {
  title: string;
  imageUri: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export { CategoryCard };
export default CategoryCard;
