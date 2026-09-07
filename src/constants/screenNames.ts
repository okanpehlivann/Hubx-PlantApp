import { ROOT_ROUTES } from '../navigation/routes';

type ScreenName = (typeof ROOT_ROUTES)[number]['name'];

export const SCREEN_NAMES = Object.fromEntries(
  ROOT_ROUTES.map(route => [route.name, route.name]),
) as { readonly [Name in ScreenName]: Name };
