export const storageKeys = {
  USER: 'user',
  USER_ID: 'user_id',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  STAY_IN: 'stay_in',
} as const;
export type StorageKeyType = keyof typeof storageKeys;

export type StorageValuesType = (typeof storageKeys)[keyof typeof storageKeys];
