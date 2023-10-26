import { BlogPage } from '@/pages/client/blog';
import { CreateBlogPage } from '@/pages/client/blog-create';
import { ChatPage } from '@/pages/client/chat';
import { RichEditorPage } from '@/pages/client/editor';
import { FriendListPage } from '@/pages/client/friend-list';
import { FriendRequestPage } from '@/pages/client/friend-request';
import { GroupPage } from '@/pages/client/group';
import { HomePage } from '@/pages/client/home';
import { NotificationPage } from '@/pages/client/notification';
import { ProfilePage } from '@/pages/client/profile';
import { QuestionAndAnswerPage } from '@/pages/client/question-and-answer';
import { DetailQuestionPage } from '@/pages/client/question-and-answer/components/detail-question';

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
    path: '/detail-question',
    element: <DetailQuestionPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog-create',
    element: <CreateBlogPage />,
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
  {
    path: '/editor',
    element: <RichEditorPage />,
  },
];
