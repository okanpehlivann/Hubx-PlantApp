import { CustomScreen } from './CustomScreen';
import type { ReactNode } from 'react';
import type { StatusBarStyle, ViewStyle } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';

export interface CustomScreenProps {
  children?: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  edges?: Edge[];
  scroll?: boolean;
  loading?: boolean;
  error?: unknown;
  errorMessage?: string;
  errorIcon?: ReactNode;
}

export default CustomScreen;
