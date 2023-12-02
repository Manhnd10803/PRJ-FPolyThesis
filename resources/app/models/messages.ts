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
  listPrivateChannel: Array<IUser>;
  conversation: Array<IMessages>;
  selectedUserInfo: IUser | undefined;
};

export type GetListPrivateChannelResponseType = {
  data: Array<IUser>;
  total_mess_count: number;
};

export type SendMessageResponseType = {
  message: string;
  data: IMessages;
};
