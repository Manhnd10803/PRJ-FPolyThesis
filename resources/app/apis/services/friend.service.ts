import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllFriendRequest = (quantity?: number) => {
  // Kiểm tra xem quantity đã được chuyển hay không
  if (quantity !== undefined) {
    return httpRequest.get(`${ApiConstants.SHOW_FRIEND_REQUEST}/${quantity}`);
  }
  // Gửi yêu cầu HTTP mà không có quantity
  return httpRequest.get(ApiConstants.SHOW_FRIEND_REQUEST);
};
const showAllFriendMyUser = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.SHOW_FRIEND_MY_USER}/${id}`);
};
const getSuggestFriends = () => {
  return httpRequest.get(ApiConstants.LIST_SUGGEST_FRIEND);
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
  getSuggestFriends,
};
