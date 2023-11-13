import { ChatPage } from '@/pages/chat';
import { HomePage } from '@/pages/client/home';

export const ChatRouter = [
  {
    path: 'chat',
    element: <ChatPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
];
