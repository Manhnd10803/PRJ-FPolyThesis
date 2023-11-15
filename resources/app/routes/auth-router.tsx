import { AccountSettingPage } from '@/pages/auth/account-setting';
import { BlogPage } from '@/pages/auth/blog';
import { CreateBlogPage } from '@/pages/auth/blog-create';
import { BlogDetailPage } from '@/pages/auth/blog/blog-detail';
import { EditProfilePage } from '@/pages/auth/edit-profile';
import { RichEditorPage } from '@/pages/auth/editor';
import { FriendListPage } from '@/pages/auth/friend-list';
import { FriendRequestPage } from '@/pages/auth/friend-request';
import { GroupPage } from '@/pages/auth/group';
import { HomePage } from '@/pages/auth/home';
import { NotificationPage } from '@/pages/auth/notification';
import { ProfilePage } from '@/pages/auth/profile';
import { QuestionAndAnswerPage } from '@/pages/auth/question-and-answer';
import { CreateQandA } from '@/pages/auth/question-and-answer/create-qanda';
import { DetailQandAPage } from '@/pages/auth/question-and-answer/detail-qanda';
import { UpdateQandA } from '@/pages/auth/question-and-answer/update-qanda/update-form';
import { ExampleUploadPage } from '@/pages/auth/example-upload';
import { PrivacySecurityPage } from '@/pages/auth/privacy-security';

export const AuthRouter = [
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
    path: '/account-setting',
    element: <AccountSettingPage />,
  },
  {
    path: '/privacy-security',
    element: <PrivacySecurityPage />,
  },
];
