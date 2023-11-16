import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showMessages = (id: number) => {
  return httpRequest.get(`${ApiConstants.SHOW_MESSAGE}/${id}`);
};

const sendMessages = <T>(receiver_id: number, data: T, socketID: any) => {
  return httpRequest.post<IBlogs>(`${ApiConstants.SEND_MESSAGES}/${receiver_id}`, data, {
    headers: {
      'X-Socket-Id': socketID,
    },
  });
};

const getListChat = () => {
  return httpRequest.get(ApiConstants.LIST_CHAT_MESSAGE);
};

const deleteChatItem = (id: number) => {
  return httpRequest.delete(`${ApiConstants.DELETE_CHAT_ITEM}/${id}`);
};

const deleteChatChannel = (id: number) => {
  return httpRequest.delete(`${ApiConstants.DELETE_CHAT_CHANNEL}/${id}`);
};

export const MessagesService = { showMessages, sendMessages, getListChat, deleteChatItem, deleteChatChannel };
