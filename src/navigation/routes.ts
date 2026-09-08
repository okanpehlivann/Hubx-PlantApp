import type { ComponentType } from 'react';
import { NAVIGATION_FLOW } from '@enums';
import MainTabNavigator from './MainTabNavigator';

type RootRoute = {
  name: string;
  flow: NAVIGATION_FLOW;
  getComponent: () => ComponentType;
};

const getScreens = (): typeof import('@screens') => require('@screens');

export const ROOT_ROUTES = [
  {
    name: 'GetStarted',
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().GetStartedScreen,
  },
  {
    name: 'Onboarding',
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().OnboardingScreen,
  },
  {
    name: 'Paywall',
    flow: NAVIGATION_FLOW.ONBOARDING,
    getComponent: (): ComponentType => getScreens().PaywallScreen,
  },
  {
    name: 'Home',
    flow: NAVIGATION_FLOW.MAIN,
    getComponent: (): ComponentType => MainTabNavigator,
  },
] as const satisfies readonly RootRoute[];
