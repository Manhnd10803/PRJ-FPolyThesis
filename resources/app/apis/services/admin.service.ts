import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getUsersAdmin = () => {
  return httpRequest.get(ApiConstants.USERS_ADMIN);
};
const getUserProfile = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.USER_PROFILE}/${id}`);
};

export const AdminService = { getUsersAdmin, getUserProfile };
