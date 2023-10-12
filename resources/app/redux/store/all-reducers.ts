import { combineReducers } from '@reduxjs/toolkit';
import { settingReducer } from '@/redux/slice';

export const allReducer = combineReducers({
  //   app: appReducer,
  setting: settingReducer,
});
