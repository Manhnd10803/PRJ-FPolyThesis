import { IUser } from './user';

export interface IMessages {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  status: number;
  deleted_by: null;
  created_at: Date;
  updated_at: Date;
  sender: Sender;
  receiver: Receiver;
}

export interface Receiver {
  id: number;
  avatar: string;
  username: string;
}

export interface Sender {
  id: number;
  avatar: string;
}

export type ChatState = {
  isLoading: boolean;
  listUserChat: Array<IUser>;
  listMessage: Array<IMessages>;
  chatWithUser: IUser | undefined;
};

export type GetListUserChatResponseType = Array<IUser>;

export type SendMessageResponseType = {
  message: string;
  data: IMessages;
};
