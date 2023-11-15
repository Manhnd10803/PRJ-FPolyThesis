import { AuthState } from '@/models/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  loading: false,
  userInfo: {}, // for user object
  accessToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    removeAccessToken(state) {
      state.accessToken = null;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clear: () => initialState,
  },
});
export const authActions = authSlice.actions;

export const { reducer: authReducer } = authSlice;
