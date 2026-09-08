import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  hydrateOnboardingStatus,
  useAppDispatch,
  useAppSelector,
} from '@store';
import { NAVIGATION_FLOW } from '@enums';
import { SCREEN_NAMES } from '@constants';
import type { RootNavigatorProps, RootStackParamList } from '@types';

import { ROOT_ROUTES } from '../routes';
import { LaunchScreen } from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({
  startAtHome = false,
}: RootNavigatorProps) {
  const dispatch = useAppDispatch();
  const { isOnboardingCompleted, isLoading } = useAppSelector(
    state => state.app,
  );
  const [isLaunchComplete, setIsLaunchComplete] = useState<boolean>(false);

  useEffect(() => {
    dispatch(hydrateOnboardingStatus())
      .unwrap()
      .catch(error => console.error(error));
  }, [dispatch]);

  const handleLaunchComplete = useCallback(() => {
    setIsLaunchComplete(true);
  }, []);

  if (isLoading || !isLaunchComplete) {
    return <LaunchScreen onComplete={handleLaunchComplete} />;
  }

  const routes = startAtHome
    ? ROOT_ROUTES.filter(route => route.name === SCREEN_NAMES.Home)
    : ROOT_ROUTES.filter(
        route =>
          route.flow ===
          (isOnboardingCompleted
            ? NAVIGATION_FLOW.MAIN
            : NAVIGATION_FLOW.ONBOARDING),
      );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={startAtHome ? SCREEN_NAMES.Home : undefined}
        screenOptions={{ headerShown: false }}
      >
        {routes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            getComponent={route.getComponent}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
