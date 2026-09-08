import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../constants/storageKeys';
import appReducer, {
  hydrateOnboardingStatus,
  persistOnboardingCompleted,
  setLoading,
  setOnboardingCompleted,
} from './appSlice';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

const getItemMock = AsyncStorage.getItem as jest.MockedFunction<
  typeof AsyncStorage.getItem
>;
const setItemMock = AsyncStorage.setItem as jest.MockedFunction<
  typeof AsyncStorage.setItem
>;

const createTestStore = (
  appState = {
    isOnboardingCompleted: false,
    isLoading: true,
  },
) =>
  configureStore({
    reducer: { app: appReducer },
    preloadedState: { app: appState },
  });

describe('appSlice reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the initial state for an unknown action', () => {
    expect(appReducer(undefined, { type: 'unknown' })).toEqual({
      isOnboardingCompleted: false,
      isLoading: true,
    });
  });

  it('updates loading without changing onboarding status', () => {
    const state = appReducer(undefined, setLoading(false));

    expect(state).toEqual({
      isOnboardingCompleted: false,
      isLoading: false,
    });
  });

  it('keeps the onboarding reducer pure', () => {
    const state = appReducer(undefined, setOnboardingCompleted(true));

    expect(state.isOnboardingCompleted).toBe(true);
    expect(setItemMock).not.toHaveBeenCalled();
  });
});

describe('appSlice thunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hydrateOnboardingStatus', () => {
    it.each([
      ['true', true],
      ['false', false],
      [null, false],
    ])('hydrates %p as %p', async (storedValue, expectedValue) => {
      getItemMock.mockResolvedValueOnce(storedValue);
      const store = createTestStore({
        isOnboardingCompleted: !expectedValue,
        isLoading: false,
      });

      const action = await store.dispatch(hydrateOnboardingStatus());

      expect(getItemMock).toHaveBeenCalledWith(STORAGE_KEYS.ONBOARDING_STATUS);
      expect(hydrateOnboardingStatus.fulfilled.match(action)).toBe(true);
      expect(store.getState().app).toEqual({
        isOnboardingCompleted: expectedValue,
        isLoading: false,
      });
    });

    it('finishes loading and preserves state when storage read fails', async () => {
      getItemMock.mockRejectedValueOnce(new Error('read failed'));
      const store = createTestStore({
        isOnboardingCompleted: true,
        isLoading: true,
      });

      const action = await store.dispatch(hydrateOnboardingStatus());

      expect(hydrateOnboardingStatus.rejected.match(action)).toBe(true);
      expect(store.getState().app).toEqual({
        isOnboardingCompleted: true,
        isLoading: false,
      });
    });

    it('rejects a stored value that is not a boolean', async () => {
      getItemMock.mockResolvedValueOnce('{"completed":"yes"}');
      const store = createTestStore();

      const action = await store.dispatch(hydrateOnboardingStatus());

      expect(hydrateOnboardingStatus.rejected.match(action)).toBe(true);
      expect(store.getState().app).toEqual({
        isOnboardingCompleted: false,
        isLoading: false,
      });
    });
  });

  describe('persistOnboardingCompleted', () => {
    it('updates onboarding status immediately and persists it', async () => {
      let finishPersistence: () => void = () => undefined;
      setItemMock.mockReturnValueOnce(
        new Promise<void>(resolve => {
          finishPersistence = resolve;
        }),
      );
      const store = createTestStore({
        isOnboardingCompleted: false,
        isLoading: false,
      });

      const pendingAction = store.dispatch(persistOnboardingCompleted(true));

      expect(store.getState().app.isOnboardingCompleted).toBe(true);
      expect(setItemMock).toHaveBeenCalledWith(
        STORAGE_KEYS.ONBOARDING_STATUS,
        'true',
      );

      finishPersistence();
      const action = await pendingAction;

      expect(persistOnboardingCompleted.fulfilled.match(action)).toBe(true);
      expect(store.getState().app.isOnboardingCompleted).toBe(true);
    });

    it('keeps the optimistic status when persistence fails', async () => {
      setItemMock.mockRejectedValueOnce(new Error('write failed'));
      const store = createTestStore({
        isOnboardingCompleted: false,
        isLoading: false,
      });

      const action = await store.dispatch(persistOnboardingCompleted(true));

      expect(persistOnboardingCompleted.rejected.match(action)).toBe(true);
      expect(store.getState().app.isOnboardingCompleted).toBe(true);
    });
  });
});
