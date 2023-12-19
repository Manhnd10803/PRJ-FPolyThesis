import { StorageFunc } from '@/utilities/local-storage/storage-func';
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
const updateAvatarProfile = (data: string) => {
  StorageFunc.setAvatarUser(data.avatar);
  return httpRequest.put(`${ApiConstants.UPDATE_AVATAR_PROFILE}`, data);
};

export const ProfileService = { getDetailProfile, getDetailUserProfile, updateCoverPhoto, updateAvatarProfile };
