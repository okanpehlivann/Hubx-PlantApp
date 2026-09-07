import { ErrorState } from './ErrorState';
import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ErrorStateProps {
  message?: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export { ErrorState };
export default ErrorState;
