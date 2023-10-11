import { ChatPage } from '@/pages/client/chat';
import { HomePage } from '@/pages/client/home';

export const ClientRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
];
