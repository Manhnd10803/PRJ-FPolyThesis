import { AppState } from '@/models/app';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AppState = {
  isLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clear: () => initialState,
  },
});
export const appActions = appSlice.actions;

export const { reducer: appReducer } = appSlice;
