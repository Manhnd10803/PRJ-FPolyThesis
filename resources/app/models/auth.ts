// Define response types for auth requests
// Định nghĩa các KIỂU DỮ LIỆU TRẢ VỀ về cho các auth request

import { IUser } from './user';

export type LoginResponseType = {
  user: IUser;
  accessToken: string;
  expiresAt: Date;
};

export type RefreshTokenResponseType = {
  accessToken: string;
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
export type ResetPasswordResponseType = {
  verification_code: number;
  password: string;
};
