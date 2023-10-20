import axios, { AxiosRequestConfig } from 'axios';
import { ILoginResponse } from './types';
import { ApiConstants } from './endpoints';
import { TokenService } from './services/token.service';

// Create an Axios instance
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_ENDPOINT_URL || 'http://127.0.0.1:8000/api/',
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT || 90 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpRequest = axios.create(requestConfig);

//===================== Request Interceptor =====================//

httpRequest.interceptors.request.use(
  config => {
    // Get token from local storage
    const token = localStorage.getItem('token');
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

//===================== Response Interceptor =====================//

httpRequest.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // If config does not exist or the retry option is not set, reject
    if (originalRequest.url !== ApiConstants.LOGIN && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const rs = await httpRequest.post<ILoginResponse>(ApiConstants.REFRESH, {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { access_token } = rs.data;
          TokenService.updateLocalAccessToken(access_token);

          return httpRequest(originalRequest);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    switch (error.response?.status) {
      case 400:
        return Promise.reject(error.response.data);
      case 401:
        TokenService.removeUser();
        window.location.reload();
        return Promise.reject(error.response.data);
      case 403:
        // do something
        return Promise.reject(error.response.data);
      case 404:
        // do something
        return Promise.reject(error.response.data);
      case 500:
        // do something
        return Promise.reject(error.response.data);
      default:
        // do something
        return Promise.reject(error.response.data);
    }
  },
);

export default httpRequest;
