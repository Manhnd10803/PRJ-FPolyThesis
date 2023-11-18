import { ChatPage } from '@/pages/chat';
import { HomePage } from '@/pages/auth/home';
import { pathName } from './path-name';

export const ChatRouter = [
  {
    path: pathName.CHAT,
    element: <ChatPage />,
  },
  {
    path: pathName.CHAT_DETAIL,
    element: <ChatPage />,
  },
  {
    path: pathName.HOME,
    element: <HomePage />,
  },
];
