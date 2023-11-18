import { combineReducers } from '@reduxjs/toolkit';
import { appReducer, authReducer, chatReducer, settingReducer } from '@/redux/slice';

export const allReducer = combineReducers({
  setting: settingReducer,
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
});
