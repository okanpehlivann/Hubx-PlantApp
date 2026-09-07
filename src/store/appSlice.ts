import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants';

interface AppState {
  isOnboardingCompleted: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  isOnboardingCompleted: false,
  isLoading: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
      AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_STATUS,
        JSON.stringify(action.payload),
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setOnboardingCompleted, setLoading } = appSlice.actions;
export default appSlice.reducer;
