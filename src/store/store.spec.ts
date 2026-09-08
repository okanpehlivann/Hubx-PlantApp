import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from '@api';
import { persistOnboardingCompleted, setLoading, setupStore } from '@store';

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: { BASE_URL: 'https://example.test/' },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

const setItemMock = AsyncStorage.setItem as jest.MockedFunction<
  typeof AsyncStorage.setItem
>;

describe('setupStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates the app and RTK Query state', () => {
    const testStore = setupStore();

    expect(testStore.getState().app).toEqual({
      isOnboardingCompleted: false,
      isLoading: true,
    });
    expect(testStore.getState()[baseApi.reducerPath]).toBeDefined();
  });

  it('accepts preloaded app state', () => {
    const testStore = setupStore({
      app: {
        isOnboardingCompleted: true,
        isLoading: false,
      },
    });

    expect(testStore.getState().app).toEqual({
      isOnboardingCompleted: true,
      isLoading: false,
    });
  });

  it('creates isolated store instances', () => {
    const firstStore = setupStore();
    const secondStore = setupStore();

    firstStore.dispatch(setLoading(false));

    expect(firstStore.getState().app.isLoading).toBe(false);
    expect(secondStore.getState().app.isLoading).toBe(true);
  });

  it('includes thunk middleware', async () => {
    setItemMock.mockResolvedValueOnce(undefined);
    const testStore = setupStore();

    await testStore.dispatch(persistOnboardingCompleted(true));

    expect(testStore.getState().app.isOnboardingCompleted).toBe(true);
  });
});
