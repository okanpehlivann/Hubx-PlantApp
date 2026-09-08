import type { ComponentType } from 'react';
import { NAVIGATION_FLOW } from '@enums';
import { SCREEN_NAMES } from '@constants';
import { MainTabNavigator } from '@navigation';

type RootRoute = {
  name: string;
  flow: NAVIGATION_FLOW;
  getComponent: () => ComponentType;
};

const getScreens = (): typeof import('@screens') => require('@screens');

export const ROOT_ROUTES = [
  {
    name: SCREEN_NAMES.GetStarted,
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().GetStartedScreen,
  },
  {
    name: SCREEN_NAMES.Onboarding,
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().OnboardingScreen,
  },
  {
    name: SCREEN_NAMES.Paywall,
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().PaywallScreen,
  },
  {
    name: SCREEN_NAMES.Home,
    flow: NAVIGATION_FLOW.MAIN,
    getComponent: (): ComponentType => MainTabNavigator,
  },
] as const satisfies readonly RootRoute[];
