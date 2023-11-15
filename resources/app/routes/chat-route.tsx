import { ChatPage } from '@/pages/chat';
import { HomePage } from '@/pages/auth/home';

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
