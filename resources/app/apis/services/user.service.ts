import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showInfoUser = () => {
  return httpRequest.get(ApiConstants.SHOW_INFO_USER);
};

const editInfoUser = <T>(data: T) => {
  return httpRequest.put(ApiConstants.EDIT_INFO_USER, data);
};

const changeActivityUser = <T>(data: T) => {
  return httpRequest.put(ApiConstants.USER_ACTIVITY, data);
};

export const UserService = { showInfoUser, editInfoUser, changeActivityUser };
