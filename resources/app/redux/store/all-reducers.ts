import { appReducer, authReducer, settingReducer } from '@/redux/slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  setting: settingReducer,
  app: appReducer,
  auth: authReducer,
});
