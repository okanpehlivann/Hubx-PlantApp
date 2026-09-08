import React, { type ReactElement, type ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { STORAGE_KEYS } from '@constants';
import { setupStore } from '@store';
import RootNavigator from './RootNavigator';
import type { MockNavigatorProps, MockScreenProps } from '.';

const mockStackScreen = () => null;

const mockStackNavigator = ({
  children,
  initialRouteName,
}: MockNavigatorProps) => {
  const routes = React.Children.toArray(
    children,
  ) as ReactElement<MockScreenProps>[];
  const activeRoute =
    routes.find(route => route.props.name === initialRouteName) ?? routes[0];

  return <Text>{`Route: ${activeRoute?.props.name ?? 'none'}`}</Text>;
};

const mockLaunchScreen = ({ onComplete }: { onComplete: () => void }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Complete launch"
    onPress={onComplete}
  >
    <Text>Launch screen</Text>
  </Pressable>
);

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: ReactNode }) => children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: (props: MockNavigatorProps) => mockStackNavigator(props),
    Screen: () => mockStackScreen(),
  }),
}));

jest.mock('@screens', () => ({
  LaunchScreen: (props: { onComplete: () => void }) => mockLaunchScreen(props),
}));

jest.mock('../routes', () => ({
  ROOT_ROUTES: [
    { name: 'GetStarted', flow: 'onboarding', getComponent: jest.fn() },
    { name: 'Onboarding', flow: 'onboarding', getComponent: jest.fn() },
    { name: 'Paywall', flow: 'onboarding', getComponent: jest.fn() },
    { name: 'Home', flow: 'main', getComponent: jest.fn() },
  ],
}));

const getItemMock = AsyncStorage.getItem as jest.MockedFunction<
  typeof AsyncStorage.getItem
>;

const renderRootNavigator = (startAtHome = false) => {
  const testStore = setupStore();

  render(
    <Provider store={testStore}>
      <RootNavigator startAtHome={startAtHome} />
    </Provider>,
  );

  return testStore;
};

const finishLaunch = async () => {
  fireEvent.press(
    await screen.findByRole('button', { name: 'Complete launch' }),
  );
};

describe('RootNavigator', () => {
  it('hydrates on mount and keeps the launch gate closed until animation completion', async () => {
    getItemMock.mockResolvedValueOnce('true');
    const testStore = renderRootNavigator();

    expect(screen.getByText('Launch screen')).toBeOnTheScreen();

    await waitFor(() => {
      expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEYS.ONBOARDING_STATUS);
      expect(testStore.getState().app).toEqual({
        isOnboardingCompleted: true,
        isLoading: false,
      });
    });

    expect(screen.getByText('Launch screen')).toBeOnTheScreen();
    expect(screen.queryByText('Route: Home')).toBeNull();

    await finishLaunch();

    expect(screen.getByText('Route: Home')).toBeOnTheScreen();
  });

  it('opens the onboarding flow when onboarding is incomplete', async () => {
    getItemMock.mockResolvedValueOnce(null);
    const testStore = renderRootNavigator();

    await waitFor(() => {
      expect(testStore.getState().app.isLoading).toBe(false);
    });
    await finishLaunch();

    expect(screen.getByText('Route: GetStarted')).toBeOnTheScreen();
    expect(screen.queryByText('Route: Home')).toBeNull();
  });

  it('opens the main flow when onboarding is complete', async () => {
    getItemMock.mockResolvedValueOnce('true');
    const testStore = renderRootNavigator();

    await waitFor(() => {
      expect(testStore.getState().app.isLoading).toBe(false);
    });
    await finishLaunch();

    expect(screen.getByText('Route: Home')).toBeOnTheScreen();
    expect(screen.queryByText('Route: GetStarted')).toBeNull();
  });

  it('starts at Home when startAtHome overrides an incomplete onboarding status', async () => {
    getItemMock.mockResolvedValueOnce('false');
    const testStore = renderRootNavigator(true);

    await waitFor(() => {
      expect(testStore.getState().app.isLoading).toBe(false);
    });
    await finishLaunch();

    expect(screen.getByText('Route: Home')).toBeOnTheScreen();
    expect(screen.queryByText('Route: GetStarted')).toBeNull();
  });
});
