import { GetListPrivateChannelResponseType, IMessages, SendMessageResponseType } from '@/models/messages';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getMessagesOfChannel = (id: number | string) => {
  return httpRequest.get(`${ApiConstants.PRIVATE_CHANNEL}/${id}`);
};

const sendMessages = <T>(receiver_id: number, data: T, socketID: any) => {
  return httpRequest.post<SendMessageResponseType>(`${ApiConstants.PRIVATE_CHANNEL}/${receiver_id}`, data, {
    headers: {
      'X-Socket-Id': socketID,
    },
  });
};

const getListPrivateChannel = () => {
  return httpRequest.get<GetListPrivateChannelResponseType>(ApiConstants.LIST_PRIVATE_CHANNEL);
};

const deleteChatItem = (id: number) => {
  return httpRequest.delete(`${ApiConstants.MESSAGES}/${id}`);
};

const deleteChatChannel = (id: number) => {
  return httpRequest.delete(`${ApiConstants.PRIVATE_CHANNEL}/${id}`);
};

export const MessagesService = {
  getMessagesOfChannel,
  sendMessages,
  getListPrivateChannel,
  deleteChatItem,
  deleteChatChannel,
};
