import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
import { TokenService } from './token.service';

type LoginResponseType = {
  // Define the properties of the response data
  email: string;
  password: string;
};
type RegisterResponseType = {
  // Define the properties of the response data

  username: string;
  email: string;
  password: string;
};
type ForgotPasswordResponseType = {
  // Define the properties of the response data
  id: number;
  name: string;
};
type ResetPasswordResponseType = {
  // Define the properties of the response data
  id: number;
  name: string;
};

const Login = <T>(data: T) => {
  return httpRequest.post<LoginResponseType>(ApiConstants.LOGIN, data);
};

const Register = <T>(data: T) => {
  return httpRequest.post<RegisterResponseType>(ApiConstants.REGISTER, data);
};

const ForgotPassword = <T>(data: T) => {
  return httpRequest.post<ForgotPasswordResponseType>(ApiConstants.FORGOTPASSWORD, data);
};

const ResetPassword = <T>(data: T) => {
  return httpRequest.post<ResetPasswordResponseType>(ApiConstants.RESETPASSWORD, data);
};

const LoginWithGoogle = () => {
  fetch('http://localhost:8000/api/auth/google-auth')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong!');
    })
    .then(({ googleLoginUrl }) => (window.location.href = googleLoginUrl))
    .then(response => {
      console.log(response);
      // save token to local storage
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const AuthService = { Login, Register, ForgotPassword, ResetPassword, LoginWithGoogle };
