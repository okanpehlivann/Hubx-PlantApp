import type { ROOT_ROUTES } from './routes';

export type RootStackParamList = {
  [Route in (typeof ROOT_ROUTES)[number] as Route['name']]: undefined;
};
