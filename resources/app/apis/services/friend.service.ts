import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllFriendRequest = () => {
  return httpRequest.get(ApiConstants.SHOW_FRIEND_REQUEST);
};
const confirmFriendRequest = <T>(id: T) => {
  return httpRequest.post(`${ApiConstants.CONFIRM_FRIEND_REQUEST}/${id}`);
};
const deleteFriendRequest = <T>(id: T) => {
  return httpRequest.delete(`${ApiConstants.DELETE_FRIEND_REQUEST}/${id}`);
};

export const FriendService = { showAllFriendRequest, confirmFriendRequest, deleteFriendRequest };
