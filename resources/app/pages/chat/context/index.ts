import { createContext, useContext } from 'react';

type ChatContextType = {
  chatId: number;
  onClickRemoveChat: (chatId: number) => void;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

ChatContext.displayName = 'ChatContext';

export const ChatContextProvider = ChatContext.Provider;

export const useChatContext = () => useContext(ChatContext);
