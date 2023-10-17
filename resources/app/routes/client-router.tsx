import { BlogPage } from '@/pages/client/blog';
import { ChatPage } from '@/pages/client/chat';
import { FriendListPage } from '@/pages/client/friend-list';
import { FriendRequestPage } from '@/pages/client/friend-request';
import { GroupPage } from '@/pages/client/group';
import { HomePage } from '@/pages/client/home';
import { NotificationPage } from '@/pages/client/notification';
import { ProfilePage } from '@/pages/client/profile';
import { QuestionAndAnswerPage } from '@/pages/client/question-and-answer';
import { FormAskQuestionPage } from '@/pages/client/question-and-answer/components/form-ask-question';
import { ListQandAPage } from '@/pages/client/question-and-answer/components/list-qanda';

export const ClientRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/question-and-answer',
    element: <QuestionAndAnswerPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/friend-list',
    element: <FriendListPage />,
  },
  {
    path: '/friend-request',
    element: <FriendRequestPage />,
  },
  {
    path: '/group',
    element: <GroupPage />,
  },
  {
    path: '/notification',
    element: <NotificationPage />,
  },
];
