import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getDetailProfile = <T>(id: T, type: string, status: string, pageParm: number) => {
  return httpRequest.get(`${ApiConstants.PROFILE}/${id}/${type}${status !== '' ? `/${status}` : ''}?page=${pageParm}`);
};

const getDetailUserProfile = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.PROFILE}/${id}`);
};

const updateCoverPhoto = (data: string) => {
  return httpRequest.put(`${ApiConstants.UPDATE_COVER_PHOTO}`, data);
};
const updateCoverAvatar = (data: string) => {
  return httpRequest.put(`${ApiConstants.UPDATE_COVER_AVATAR}`, data);
};

export const ProfileService = { getDetailProfile, getDetailUserProfile, updateCoverPhoto, updateCoverAvatar };
