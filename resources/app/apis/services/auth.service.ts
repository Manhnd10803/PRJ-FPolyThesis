import { StorageFunc } from '@/utilities/local-storage/storage-func';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
import {
  ConfirmPasswordResponseType,
  ForgotPasswordResponseType,
  GetUserDetailResponseType,
  LoginResponseType,
  RefreshTokenResponseType,
  RegisterResponseType,
  ResetPasswordResponseType,
  VerifyEmailRegisterResponseType,
} from '@/models/auth';
import toast from 'react-hot-toast';
import { store } from '@/redux/store/store';
import { authActions } from '@/redux/slice';
import { clear } from '@/utilities/local-storage';

const Login = async <T>(dataForm: T) => {
  try {
    const { data } = await httpRequest.post<LoginResponseType>(ApiConstants.LOGIN, dataForm);

    toast.success('Đăng nhập thành công');
    //save data login to storage
    StorageFunc.saveDataAfterLogin(data);
    store.dispatch(authActions.setAccessToken(data.access_token));

    const { data: userInfo } = await AuthService.GetUserDetail();
    store.dispatch(authActions.setUserInfo(userInfo));

    StorageFunc.saveUserDetailData(userInfo);
    return data;
  } catch (error: any) {
    if (error.message === 'Mật khẩu không đúng' || error.message === 'Email không tồn tại') {
      toast.error('Sai thông tin đăng nhập');
    } else if (error) {
      toast.error('Lỗi server');
    }
    return error;
  }
};

const RefreshToken = async () => {
  try {
    const { data } = await httpRequest.post<RefreshTokenResponseType>(ApiConstants.REFRESH_TOKEN, {
      refresh_token: StorageFunc.getRefreshToken(),
    });

    return data;
  } catch (error) {
    toast.error('Refresh token failed');
    throw error;
  }
};

const Logout = async () => {
  try {
    const response = await httpRequest.post<any>(ApiConstants.LOGOUT);

    store.dispatch(authActions.clear());
    clear();

    return response;
  } catch (error) {
    toast.error('Đăng xuất thất bại');
    throw error;
  }
};

const GetUserDetail = () => {
  return httpRequest.get<GetUserDetailResponseType>(ApiConstants.USER_DETAIL);
};

const Register = <T>(data: T) => {
  return httpRequest.post<RegisterResponseType>(ApiConstants.REGISTER, data);
};

const VerifyEmailRegister = <T>(data: T) => {
  return httpRequest.post<VerifyEmailRegisterResponseType>(ApiConstants.VERIFY_EMAIL_REGISTER, data);
};

const ForgotPassword = <T>(data: T) => {
  return httpRequest.post<ForgotPasswordResponseType>(ApiConstants.FORGOT_PASSWORD, data);
};

const ConfirmPassword = <T>(data: T) => {
  return httpRequest.post<ConfirmPasswordResponseType>(ApiConstants.CONFIRM_PASSWORD, data);
};

const ResetPassword = <T>(data: T) => {
  return httpRequest.post<ResetPasswordResponseType>(ApiConstants.RESET_PASSWORD, data);
};

const ResetNewPassword = <T>(data: T) => {
  return httpRequest.post<ResetPasswordResponseType>(ApiConstants.RESET_NEW_PASSWORD, data);
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
        StorageFunc.saveDataAfterLoginGoogle(response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const AuthService = {
  Login,
  Register,
  LoginWithGoogle,
  ForgotPassword,
  ConfirmPassword,
  ResetPassword,
  ResetNewPassword,
  VerifyEmailRegister,
  RefreshToken,
  GetUserDetail,
  Logout,
};
