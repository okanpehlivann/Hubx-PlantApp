import type { CustomTextVariant } from '@components';
import { WelcomeTitle } from './WelcomeTitle';

export interface WelcomeTitleProps {
  prefix: string;
  highlight: string;
  suffix?: string;
  variant?: CustomTextVariant;
  highlightVariant?: CustomTextVariant;
  letterSpacing?: number;
  shadow?: boolean;
}

export default WelcomeTitle;
