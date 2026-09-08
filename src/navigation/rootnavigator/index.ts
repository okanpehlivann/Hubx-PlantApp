import { ReactNode } from 'react';
import RootNavigator from './RootNavigator';

export type MockScreenProps = {
  name: string;
};

export type MockNavigatorProps = {
  children: ReactNode;
  initialRouteName?: string;
};

export default RootNavigator;
