import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showMessages = () => {
  return httpRequest.get(ApiConstants.SHOW_MESSAGES);
};

const sendMessages = <T>(data: T) => {
  return httpRequest.post<IBlogs>(ApiConstants.SEND_MESSAGES, data);
};

export const MessagesService = { showMessages, sendMessages };
