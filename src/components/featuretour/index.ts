import type { RefObject } from 'react';
import type { ViewInstance } from 'react-native';
import { FeatureTour } from './FeatureTour';

export type FeatureTourPlacement = 'auto' | 'above' | 'below';

export type FeatureTourTargetLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FeatureTourStep = {
  id: string;
  title: string;
  description: string;
  targetRef: RefObject<ViewInstance | null>;
  placement?: FeatureTourPlacement;
  spotlightPadding?: number;
  borderRadius?: number;
};

export interface FeatureTourProps {
  visible: boolean;
  steps: FeatureTourStep[];
  onFinish: () => void;
  onSkip?: () => void;
}

export { FeatureTour };
export default FeatureTour;
