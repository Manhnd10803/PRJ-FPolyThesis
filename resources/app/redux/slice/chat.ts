import { ChatState } from '@/models/messages';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChatState = {
  isLoading: false,
  listPrivateChannel: [],
  listMessage: [],
  chatWithUser: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListPrivateChannel: (state, action) => {
      state.listPrivateChannel = action.payload;
    },
    getDetailUserChatById: (state, action) => {
      state.chatWithUser = state.listPrivateChannel.find(user => Number(user.id) === Number(action.payload));
    },
    setListMessage: (state, action) => {
      state.listMessage = action.payload;
    },
    addMessageToListMessage: (state, action) => {
      state.listMessage.push(action.payload);
    },
    removeMessageFromListMessage: (state, action) => {
      state.listMessage = state.listMessage.filter(message => Number(message.id) !== Number(action.payload));
    },
    removeChannel: (state, action) => {
      state.listPrivateChannel = state.listPrivateChannel.filter(user => user.id !== action.payload);
    },
    clear: () => initialState,
  },
});
export const chatActions = chatSlice.actions;

export const { reducer: chatReducer } = chatSlice;
