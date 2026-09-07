import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setOnboardingCompleted,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from '@store';
import { STORAGE_KEYS } from '@constants';
import { NAVIGATION_FLOW } from '@enums';
import { RootStackParamList } from './types';

import { ROOT_ROUTES } from './routes';
import { LaunchScreen } from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { isOnboardingCompleted, isLoading } = useAppSelector(
    state => state.app,
  );
  const [isLaunchComplete, setIsLaunchComplete] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(
          STORAGE_KEYS.ONBOARDING_STATUS,
        );
        if (value !== null) {
          dispatch(setOnboardingCompleted(JSON.parse(value)));
        }
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(setLoading(false));
      }
    };
    checkStatus();
  }, [dispatch]);

  const handleLaunchComplete = useCallback(() => {
    setIsLaunchComplete(true);
  }, []);

  if (isLoading || !isLaunchComplete) {
    return <LaunchScreen onComplete={handleLaunchComplete} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {ROOT_ROUTES.filter(
          route =>
            route.flow ===
            (isOnboardingCompleted
              ? NAVIGATION_FLOW.MAIN
              : NAVIGATION_FLOW.ONBOARDING),
        ).map(route => (
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
