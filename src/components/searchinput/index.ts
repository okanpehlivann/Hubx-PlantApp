import { ReactNode } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { SearchInput } from './SearchInput';
import { SpeechToTextError } from '@types';

export interface SearchInputProps
  extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  clearable?: boolean;
  voiceEnabled?: boolean;
  speechLocale?: string;
  onVoiceError?: (error: SpeechToTextError) => void;
}

export default SearchInput;
