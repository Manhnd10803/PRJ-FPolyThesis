import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllFriendRequest = () => {
  return httpRequest.get(ApiConstants.SHOW_FRIEND_REQUEST);
};
const showAllFriendMyUser = () => {
  return httpRequest.get(ApiConstants.SHOW_FRIEND_MY_USER);
};
const confirmFriendRequest = <T>(id: T) => {
  return httpRequest.post(`${ApiConstants.CONFIRM_FRIEND_REQUEST}/${id}`);
};
const unFriend = <T>(id: T) => {
  return httpRequest.delete(`${ApiConstants.UN_FRIEND}/${id}`);
};
const statusFriend = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.STATUS_FRIEND}/${id}`);
};
const addFriend = <T>(id: T) => {
  return httpRequest.post(`${ApiConstants.ADD_FRIEND}/${id}`);
};
const deleteFriendRequest = <T>(id: T) => {
  return httpRequest.delete(`${ApiConstants.DELETE_FRIEND_REQUEST}/${id}`);
};

export const FriendService = {
  showAllFriendRequest,
  confirmFriendRequest,
  deleteFriendRequest,
  showAllFriendMyUser,
  addFriend,
  statusFriend,
  unFriend,
};
