import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export interface AppState {
  isOnboardingCompleted: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  isOnboardingCompleted: false,
  isLoading: true,
};

const parseOnboardingStatus = (value: string | null): boolean => {
  if (value === null) {
    return false;
  }

  const parsedValue: unknown = JSON.parse(value);

  if (typeof parsedValue !== 'boolean') {
    throw new Error('[Storage] Invalid onboarding status');
  }

  return parsedValue;
};

export const hydrateOnboardingStatus = createAsyncThunk(
  'app/hydrateOnboardingStatus',
  async (): Promise<boolean> => {
    const storedValue = await AsyncStorage.getItem(
      STORAGE_KEYS.ONBOARDING_STATUS,
    );

    return parseOnboardingStatus(storedValue);
  },
);

export const persistOnboardingCompleted = createAsyncThunk(
  'app/persistOnboardingCompleted',
  async (isCompleted: boolean): Promise<boolean> => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.ONBOARDING_STATUS,
      JSON.stringify(isCompleted),
    );

    return isCompleted;
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(hydrateOnboardingStatus.pending, state => {
        state.isLoading = true;
      })
      .addCase(hydrateOnboardingStatus.fulfilled, (state, action) => {
        state.isOnboardingCompleted = action.payload;
        state.isLoading = false;
      })
      .addCase(hydrateOnboardingStatus.rejected, state => {
        state.isLoading = false;
      })
      .addCase(persistOnboardingCompleted.pending, (state, action) => {
        state.isOnboardingCompleted = action.meta.arg;
      })
      .addCase(persistOnboardingCompleted.fulfilled, (state, action) => {
        state.isOnboardingCompleted = action.payload;
      });
  },
});

export const { setOnboardingCompleted, setLoading } = appSlice.actions;
export default appSlice.reducer;
