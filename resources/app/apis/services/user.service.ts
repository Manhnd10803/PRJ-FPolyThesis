import { StorageFunc } from '@/utilities/local-storage/storage-func';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

interface tyProps {
  activity_user: string;
}

const showInfoUser = () => {
  return httpRequest.get(ApiConstants.SHOW_INFO_USER);
};

const editInfoUser = <T>(data: T) => {
  return httpRequest.put(ApiConstants.EDIT_INFO_USER, data);
};

const changeActivityUser = <T extends tyProps>(data: T) => {
  StorageFunc.setActivityUser(data.activity_user);
  return httpRequest.put(ApiConstants.USER_ACTIVITY, data);
};

export const UserService = { showInfoUser, editInfoUser, changeActivityUser };
