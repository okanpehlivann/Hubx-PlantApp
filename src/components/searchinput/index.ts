import type { ReactNode, Ref } from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewInstance,
  ViewStyle,
} from 'react-native';
import { SearchInput } from './SearchInput';
import { SpeechToTextError } from '@types';

export interface SearchInputProps
  extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  icon?: ReactNode;
  inputContainerRef?: Ref<ViewInstance>;
  voiceButtonRef?: Ref<ViewInstance>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  clearable?: boolean;
  voiceEnabled?: boolean;
  speechLocale?: string;
  onVoiceError?: (error: SpeechToTextError) => void;
}

export default SearchInput;
