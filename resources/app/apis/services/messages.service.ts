import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showMessages = (id: number) => {
  return httpRequest.get(`${ApiConstants.SHOW_MESSAGE}/${id}`);
};

const sendMessages = <T>(receiver_id: number, data: T) => {
  return httpRequest.post<IBlogs>(`${ApiConstants.SEND_MESSAGES}/${receiver_id}`, data);
};

const getListChat = () => {
  return httpRequest.get(ApiConstants.LIST_CHAT_MESSAGE);
};

export const MessagesService = { showMessages, sendMessages, getListChat };
