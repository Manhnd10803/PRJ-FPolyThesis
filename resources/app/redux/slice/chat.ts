import { ChatState } from '@/models/messages';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChatState = {
  isLoading: false,
  listUserChat: [],
  listMessage: [],
  chatWithUser: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListUserChat: (state, action) => {
      state.listUserChat = action.payload;
    },
    getDetailUserChatById: (state, action) => {
      state.chatWithUser = state.listUserChat.find(user => Number(user.id) === Number(action.payload));
    },
    setListMessage: (state, action) => {
      state.listMessage = action.payload;
    },
    addMessageToListMessage: (state, action) => {
      state.listMessage.push(action.payload);
    },
    removeMessageFromListMessage: (state, action) => {
      const { messageId } = action.payload;
      state.listMessage = state.listMessage.filter(message => message.id !== messageId);
    },
    clear: () => initialState,
  },
});
export const chatActions = chatSlice.actions;

export const { reducer: chatReducer } = chatSlice;
