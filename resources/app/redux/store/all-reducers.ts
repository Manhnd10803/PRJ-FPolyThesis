import { combineReducers } from '@reduxjs/toolkit';
import { appReducer, authReducer, settingReducer } from '@/redux/slice';

export const allReducer = combineReducers({
  setting: settingReducer,
  app: appReducer,
  auth: authReducer,
});
