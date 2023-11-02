import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getDetailProfile = <T>(id: T, type: string, status: string) => {
  return httpRequest.get(`${ApiConstants.PROFILE}/${id}/${type}/${status}`);
};

const getDetailUserProfile = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.DETAIL_USER_PROFILE}/${id}`);
};

export const ProfileService = { getDetailProfile, getDetailUserProfile };
