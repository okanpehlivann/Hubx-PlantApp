import { CustomScreen } from './CustomScreen';
import { Edge } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { ViewStyle, StatusBarStyle } from 'react-native';

export interface CustomScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  edges?: Edge[];
  scroll?: boolean;
}

export default CustomScreen;
