import type { ROOT_ROUTES } from './routes';

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
