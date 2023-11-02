export const storageKeys = {
  USER: 'user',
  USER_ID: 'user_id',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;
export type StorageKeyType = keyof typeof storageKeys;

export type StorageValuesType = (typeof storageKeys)[keyof typeof storageKeys];
