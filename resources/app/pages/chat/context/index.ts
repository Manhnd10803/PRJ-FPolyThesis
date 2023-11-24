import { createContext, useContext } from 'react';

type ChatContextType = {
  chatId: string;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

ChatContext.displayName = 'ChatContext';

export const ChatContextProvider = ChatContext.Provider;

export const useChatContext = () => useContext(ChatContext);
