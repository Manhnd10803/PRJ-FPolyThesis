import { GetListPrivateChannelResponseType, IMessages, SendMessageResponseType } from '@/models/messages';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
import { Paginate } from '@/models/pagination';

// channel
const getConversationOfChannel = (id: number | string, quantity: number, page: number) => {
  return httpRequest.get<Paginate<IMessages>>(`${ApiConstants.PRIVATE_CHANNEL}/${id}/${quantity}?page=${page}`);
};

const getListPrivateChannel = () => {
  return httpRequest.get<GetListPrivateChannelResponseType>(ApiConstants.LIST_PRIVATE_CHANNEL);
};

const deletePrivateChannel = (id: number) => {
  return httpRequest.delete(`${ApiConstants.PRIVATE_CHANNEL}/${id}`);
};

// message
const sendMessages = <T>(receiverId: number, data: T, socketID: any) => {
  return httpRequest.post<SendMessageResponseType>(`${ApiConstants.PRIVATE_CHANNEL}/${receiverId}`, data, {
    headers: {
      'X-Socket-Id': socketID,
    },
  });
};

const deleteMessage = (id: number) => {
  return httpRequest.delete(`${ApiConstants.MESSAGES}/${id}`);
};

export const MessagesService = {
  getConversationOfChannel,
  sendMessages,
  getListPrivateChannel,
  deleteMessage,
  deletePrivateChannel,
};
