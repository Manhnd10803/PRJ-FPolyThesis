import { ChatState, IMessages } from '@/models/messages';
import { IUser } from '@/models/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ChatState = {
  isLoading: false,
  listPrivateChannel: [],
  selectedUserInfo: undefined,
  conversation: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<ChatState['isLoading']>) => {
      state.isLoading = payload;
    },

    setListPrivateChannel: (state, { payload }: PayloadAction<ChatState['listPrivateChannel']>) => {
      state.listPrivateChannel = payload;
    },

    addPrivateChannel: (state, { payload }: PayloadAction<IUser>) => {
      const isExist = state.listPrivateChannel.findIndex(item => +item.id === +payload.id) !== -1;
      if (isExist) {
        console.log('Đã tồn tai channel, Không add vào nữa');
        return;
      }
      state.listPrivateChannel = [payload, ...state.listPrivateChannel];
    },

    getDetailUserChatById: (state, { payload }: PayloadAction<IUser['id']>) => {
      state.selectedUserInfo = state.listPrivateChannel.find(user => +user.id === +payload);
    },

    setConversation: (state, { payload }: PayloadAction<ChatState['conversation']>) => {
      state.conversation = payload;
    },

    addMessageToConversation: (state, { payload }: PayloadAction<IMessages>) => {
      state.conversation.push(payload);
    },

    removeMessageFromConversation: (state, { payload }: PayloadAction<IMessages['id']>) => {
      state.conversation = state.conversation.filter(message => +message.id !== +payload);
    },

    removePrivateChannel: (state, { payload }: PayloadAction<IUser['id']>) => {
      state.conversation = [];
      state.listPrivateChannel = state.listPrivateChannel.filter(channel => +channel.id !== +payload);

      state.selectedUserInfo = undefined;
    },

    clearConversation: state => {
      state.selectedUserInfo = undefined;
      state.conversation = [];
    },

    clear: () => initialState,
  },
});
export const chatActions = chatSlice.actions;

export const { reducer: chatReducer } = chatSlice;
