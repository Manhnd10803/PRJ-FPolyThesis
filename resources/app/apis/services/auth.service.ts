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

const Login = async <T>(dataForm: T) => {
  try {
    const { data } = await httpRequest.post<LoginResponseType>(ApiConstants.LOGIN, dataForm);

    toast.success('Đăng nhập thành công');
    //save data login to storage
    StorageFunc.saveDataAfterLogin(data);

    const { data: userInfo } = await AuthService.GetUserDetail();

    store.dispatch(authActions.setAccessToken(data.access_token));
    store.dispatch(authActions.setUserInfo(userInfo));

    //auto refresh token before expired time
    AuthService.AutoRefreshToken(data.expires_in);

    StorageFunc.saveUserDetailData(userInfo);
    return data;
  } catch (error: any) {
    if (error.message == 'The user credentials were incorrect.') {
      toast.error('Sai thông tin đăng nhập');
    } else if (error) {
      toast.error('Lỗi server');
    }
    return error;
  }
};

const GetUserDetail = () => {
  return httpRequest.get<GetUserDetailResponseType>(ApiConstants.USER_DETAIL);
};

const RefreshToken = <T>(data: T) => {
  return httpRequest.post<RefreshTokenResponseType>(ApiConstants.REFRESH_TOKEN, data);
};

const AutoRefreshToken = (expiresIn: number) => {
  const refreshTimeoutId = setTimeout(
    async () => {
      try {
        const { data } = await RefreshToken({
          refresh_token: StorageFunc.getRefreshToken(),
          grant_type: import.meta.env.VITE_PASSPORT_PASSWORD_GRANT_TYPE_REFRESH,
          client_id: import.meta.env.PASSPORT_PASSWORD_GRANT_CLIENT_ID,
          client_secret: import.meta.env.PASSPORT_PASSWORD_GRANT_CLIENT_SECRET,
        });
        StorageFunc.saveDataAfterLogin(data);

        // register auto refresh token after refresh token success
        AutoRefreshToken(data.expires_in);
        console.log({ data });
      } catch (error) {
        console.log(error);
      }
    },
    expiresIn * 1000 - 5000,
  );
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

// sau sua thanh service giong nhu tren, doan logic vut vao component
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
  AutoRefreshToken,
  GetUserDetail,
};
