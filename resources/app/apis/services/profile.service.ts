import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getDetailProfile = <T>(id: T, type: string, status: string) => {
  return httpRequest.get(`${ApiConstants.PROFILE}/${id}/${type}/${status}`);
};

const getDetailUserProfile = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.PROFILE}/${id}`);
};

const updateCoverPhoto = (data: string) => {
  return httpRequest.put(`${ApiConstants.UPDATE_COVER_PHOTO}`, data);
};

export const ProfileService = { getDetailProfile, getDetailUserProfile, updateCoverPhoto };
