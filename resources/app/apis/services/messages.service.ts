import { GetListUserChatResponseType, IMessages, SendMessageResponseType } from '@/models/messages';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showMessages = (id: number | string, quantityMessages: number, page: number) => {
  return httpRequest.get(`${ApiConstants.MESSAGES}/${id}/${quantityMessages}?page=${page}`);
};

const sendMessages = <T>(receiver_id: number, data: T, socketID: any) => {
  return httpRequest.post<SendMessageResponseType>(`${ApiConstants.MESSAGES}/${receiver_id}`, data, {
    headers: {
      'X-Socket-Id': socketID,
    },
  });
};

const getListUserChat = () => {
  return httpRequest.get<GetListUserChatResponseType>(ApiConstants.LIST_USER_CHAT);
};

const deleteChatItem = (id: number) => {
  return httpRequest.delete(`${ApiConstants.MESSAGES}/${id}`);
};

const deleteChatChannel = (id: number) => {
  return httpRequest.delete(`${ApiConstants.CHAT_CHANNEL}/${id}`);
};

export const MessagesService = { showMessages, sendMessages, getListUserChat, deleteChatItem, deleteChatChannel };
