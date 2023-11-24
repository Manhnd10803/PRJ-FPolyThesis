import { ChatState } from '@/models/messages';
import { createSlice } from '@reduxjs/toolkit';

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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setListPrivateChannel: (state, action) => {
      state.listPrivateChannel = action.payload;
    },

    getDetailUserChatById: (state, action) => {
      state.selectedUserInfo = state.listPrivateChannel.find(user => +user.id === +action.payload);
    },

    setConversation: (state, action) => {
      state.conversation = action.payload;
    },

    addMessageToConversation: (state, action) => {
      state.conversation.push(action.payload);
    },

    removeMessageFromConversation: (state, action) => {
      state.conversation = state.conversation.filter(message => +message.id !== +action.payload);
    },

    removePrivateChannel: (state, action) => {
      state.conversation = [];
      state.listPrivateChannel = state.listPrivateChannel.filter(channel => +channel.id !== +action.payload);
    },

    clearConversation: state => {
      state.conversation = [];
    },

    clear: () => initialState,
  },
});
export const chatActions = chatSlice.actions;

export const { reducer: chatReducer } = chatSlice;
