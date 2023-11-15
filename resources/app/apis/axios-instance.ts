import { StorageFunc } from '@/utilities/local-storage/storage-func';
import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { ApiConstants } from './endpoints';
import { AuthService } from './services/auth.service';
import { store } from '@/redux/store/store';
import { authActions } from '@/redux/slice';
import { RefreshTokenResponseType } from '@/models/auth';

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
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    const originalRequest = error.config;

    // If url là /login va /refresh , khong goi api refresh token  ( neu k se bi infinite loop)
    if (
      ![ApiConstants.LOGIN, ApiConstants.REFRESH_TOKEN, ApiConstants.LOGOUT].includes(originalRequest.url) &&
      error.response
    ) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = AuthService.RefreshToken().then(data => {
            refreshTokenPromise = null;
            return data;
          });
        }
        originalRequest._retry = true;

        return refreshTokenPromise.then(data => {
          store.dispatch(authActions.setAccessToken(data.access_token));

          StorageFunc.saveDataAfterLogin(data);

          return httpRequest(originalRequest);
        });
      }
    }

    switch (error.response?.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500:
      default:
        return Promise.reject(error.response.data);
    }
  },
);

export default httpRequest;
