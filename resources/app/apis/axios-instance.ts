import { StorageFunc } from '@/utilities/local-storage/storage-func';
import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { ApiConstants } from './endpoints';
import { AuthService } from './services/auth.service';
import { store } from '@/redux/store/store';
import { authActions } from '@/redux/slice';
import { RefreshTokenResponseType } from '@/models/auth';
import { clear } from '@/utilities/local-storage';
import { useNavigate } from 'react-router-dom';
// import { pathName } from '@/routes/path-name';

// Create an Axios instance
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_ENDPOINT_URL || 'http://localhost:8000/api/',
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT || 90 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpRequest = axios.create(requestConfig);

//===================== Request Interceptor =====================//

httpRequest.interceptors.request.use(
  config => {
    // Get token from local storage, gắn vào header request
    const token = StorageFunc.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // You can modify the request configuration here (e.g., adding headers, tokens, etc.)
    return config;
  },
  async error => {
    return Promise.reject(error);
  },
);

let refreshTokenPromise: Promise<RefreshTokenResponseType> | null;
//===================== Response Interceptor =====================//

httpRequest.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // Nếu url là /login va /refresh , khong goi api refresh token  ( neu k se bi infinite loop)
    if (
      ![ApiConstants.LOGIN, , ApiConstants.REFRESH_TOKEN, ApiConstants.LOGOUT].includes(originalRequest.url) &&
      error.response
    ) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = AuthService.RefreshToken();
        }
        originalRequest._retry = true;

        return refreshTokenPromise
          .then(data => {
            store.dispatch(authActions.setAccessToken(data.access_token));

            StorageFunc.saveDataAfterLogin(data);

            // Get user info after refresh token (in case user refresh page when token expired )
            AuthService.GetUserDetail().then(({ data: userData }) => {
              store.dispatch(authActions.setUserInfo(userData.user));

              StorageFunc.saveUserDetailData(userData);
            });

            refreshTokenPromise = null;
            return httpRequest(originalRequest);
          })
          .catch(error => {
            console.log(error);
            refreshTokenPromise = null;
          });
      }
    }

    switch (error.response?.status) {
      case 400: {
        return Promise.reject(error.response.data);
      }
      case 401: {
        if (ApiConstants.REFRESH_TOKEN === originalRequest.url) {
          toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!', {
            position: 'top-center',
            duration: 20000,
          });
          clear();
          store.dispatch(authActions.clear());
        }
        return;
      }
      // case 404: {
      //   window.location.replace('/404');
      //   return Promise.reject(error.response.data);
      // }
      case 500: {
        toast.error('Có lỗi server!');
        return Promise.reject(error.response.data);
        // return window.location.replace(pathName.ERROR_500);
      }
      default: {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        return Promise.reject(error.response.data);
      }
    }
  },
);

export default httpRequest;
