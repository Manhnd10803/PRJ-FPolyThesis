import { StorageFunc } from '@/utilities/local-storage/storage-func';
import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance
const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_ENDPOINT_URL || 'http://127.0.0.1:8000/',
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

//===================== Response Interceptor =====================//

httpRequest.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  async error => {
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    // const originalRequest = error.config;

    // If url là /login va /refresh , khong goi api refresh token
    // if (![ApiConstants.LOGIN, ApiConstants.REFRESH_TOKEN].includes(originalRequest.url) && error.response) {
    //   // Access Token was expired
    //   if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true;
    //     try {
    //       const rs = await AuthService.RefreshToken();

    //       const { accessToken } = rs.data;
    //       StorageFunc.saveAccessToken(accessToken);

    //       return httpRequest(originalRequest);
    //     } catch (_error) {
    //       return Promise.reject(_error);
    //     }
    //   }
    // }

    switch (error.response?.status) {
      case 400:
      case 401:
        return window.location.replace('/login');
      case 403:
      case 404:
      case 500:
      default:
        // do something
        return Promise.reject(error.response.data);
    }
  },
);

export default httpRequest;
