import { load, remove, save } from '@/utilities/local-storage';
import { ILoginResponse, IUser } from '../types';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getLocalRefreshToken = () => {
  const user = load<any>('user');
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = load<any>('user');
  return user?.accessToken;
};

const refreshToken = () => {
  return httpRequest.post<ILoginResponse>(ApiConstants.REFRESH, {
    refreshToken: getLocalRefreshToken(),
  });
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
  refreshToken,
};
