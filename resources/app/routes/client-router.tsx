import { PrivacySettingPage } from '@/pages/client/account/privacy-setting';
import { BlogPage } from '@/pages/client/blog';
import { CreateBlogPage } from '@/pages/client/blog-create';
import { BlogDetailPage } from '@/pages/client/blog/blog-detail';
import { ChatPage } from '@/pages/client/chat';
import { EditProfilePage } from '@/pages/client/edit-profile';
import { RichEditorPage } from '@/pages/client/editor';
import { FriendListPage } from '@/pages/client/friend-list';
import { FriendRequestPage } from '@/pages/client/friend-request';
import { GroupPage } from '@/pages/client/group';
import { HomePage } from '@/pages/client/home';
import { NotificationPage } from '@/pages/client/notification';
import { ProfilePage } from '@/pages/client/profile';
import { QuestionAndAnswerPage } from '@/pages/client/question-and-answer';
import { CreateQandA } from '@/pages/client/question-and-answer/create-qanda';
import { DetailQandAPage } from '@/pages/client/question-and-answer/detail-qanda';
import { UpdateQandA } from '@/pages/client/question-and-answer/update-qanda/update-form';
import { ExampleUploadPage } from '@/pages/client/example-upload';

export const ClientRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/quests',
    element: <QuestionAndAnswerPage />,
  },
  {
    path: '/quests/create',
    element: <CreateQandA />,
  },
  {
    path: '/quests/update/:id',
    element: <UpdateQandA />,
  },
  {
    path: '/quests/:id',
    element: <DetailQandAPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog-create',
    element: <CreateBlogPage />,
    noRightSidebar: true,
  },
  {
    path: '/blog-detail/:id',
    element: <BlogDetailPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
    noRightSidebar: true,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/:id',
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
    path: '/edit-profile',
    element: <EditProfilePage />,
  },
  {
    path: '/editor',
    element: <RichEditorPage />,
  },
  {
    path: '/upload',
    element: <ExampleUploadPage />,
  },
  {
    path: '/account/user-privacy-setting',
    element: <PrivacySettingPage />,
  },
];
