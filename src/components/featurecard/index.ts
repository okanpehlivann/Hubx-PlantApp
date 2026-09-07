import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { FeatureCard } from './FeatureCard';

export interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  style?: ViewStyle;
}

export default FeatureCard;
