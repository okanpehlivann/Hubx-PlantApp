import React from 'react';
import { SvgProps } from 'react-native-svg';
import { ScannerIcon, SpeedometerIcon } from '@assets';
import { PAYWALL_OPTIONS } from '@enums';

export interface PaywallFeature {
  id: string;
  title: string;
  description: string;
  IconComponent: React.FC<SvgProps>;
}

export const PAYWALL_FEATURES: PaywallFeature[] = [
  {
    id: '1',
    IconComponent: ScannerIcon,
    title: 'Unlimited',
    description: 'Plant Identify',
  },
  {
    id: '2',
    IconComponent: SpeedometerIcon,
    title: 'Faster',
    description: 'Process',
  },
  {
    id: '3',
    IconComponent: ScannerIcon,
    title: 'Detailed',
    description: 'Plant Care',
  },
];

export interface PaywallPlan {
  id: PAYWALL_OPTIONS;
  title: string;
  description: string;
  badge?: string;
}

export const PAYWALL_PLANS: PaywallPlan[] = [
  {
    id: PAYWALL_OPTIONS.MONTHLY,
    title: '1 Month',
    description: '$2.99/month, auto renewable',
  },
  {
    id: PAYWALL_OPTIONS.YEARLY,
    title: '1 Year',
    description: 'First 3 days free, then $529.99/year',
    badge: 'Save 50%',
  },
];
