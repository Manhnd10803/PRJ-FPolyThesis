// Define response types for auth requests
// Định nghĩa các KIỂU DỮ LIỆU TRẢ VỀ về cho các auth request

import { IUser } from './user';

export type GetUserDetailResponseType = {
  user: IUser;
};

export type LoginResponseType = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenResponseType = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type RegisterResponseType = {
  email: string;
  message: string;
};

// --- sua lai giong response cua backend
export type VerifyEmailRegisterResponseType = {
  verification_code: number;
  email: string;
};

export type ForgotPasswordResponseType = {
  email: string;
};

export type ConfirmPasswordResponseType = {
  email: string;
  password: string;
};

export type ResetPasswordResponseType = {
  verification_code: number;
  password: string;
};
