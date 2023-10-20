import { load, remove, save } from '@/utilities/local-storage';
import { IUser } from '../types';

const getLocalRefreshToken = () => {
  const user = load<any>('user');
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = load<any>('user');
  return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
  save('access_token', token);
};

const getUser = () => {
  return load<IUser>('user');
};

const setUser = (user: IUser) => {
  save('user', user);
};

const removeUser = () => {
  remove('user');
};

export const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
