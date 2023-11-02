import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

// Nhớ khai báo type cho response data đằng sau phương thức
// Type lấy từ data trả về của api

const getUsersAdmin = () => {
  return httpRequest.get(ApiConstants.USERS_ADMIN);
};

export const AdminService = { getUsersAdmin };
