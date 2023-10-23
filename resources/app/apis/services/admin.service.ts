import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getUsersAdmin = () => {
  return httpRequest.get(ApiConstants.USERS_ADMIN);
};

export const AdminService = { getUsersAdmin };
