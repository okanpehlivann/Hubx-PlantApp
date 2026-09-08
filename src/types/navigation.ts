import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from '@constants';
import { ROOT_ROUTES } from '@navigation';

export type GetStartedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.GetStarted
>;

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.Onboarding
>;

export interface RootNavigatorProps {
  startAtHome?: boolean;
}

export type MainTabParamList = {
  Home: undefined;
  Diagnose: undefined;
  Scan: undefined;
  Garden: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  [Route in (typeof ROOT_ROUTES)[number] as Route['name']]: undefined;
};
