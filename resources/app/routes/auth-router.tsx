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
import { pathName } from './path-name';

export const AuthRouter = [
  {
    path: pathName.HOME,
    element: <HomePage />,
  },
  {
    path: pathName.QUESTS,
    element: <QuestionAndAnswerPage />,
  },
  {
    path: pathName.QUESTS_CREATE,
    element: <CreateQandA />,
  },
  {
    path: pathName.QUESTS_UPDATE,
    element: <UpdateQandA />,
  },
  {
    path: pathName.QUESTS_DETAIL,
    element: <DetailQandAPage />,
  },
  {
    path: pathName.BLOG,
    element: <BlogPage />,
  },
  {
    path: pathName.BLOG_CREATE,
    element: <CreateBlogPage />,
    noRightSidebar: true,
  },
  {
    path: pathName.BLOG_DETAIL,
    element: <BlogDetailPage />,
  },
  {
    path: pathName.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: pathName.PROFILE_ID,
    element: <ProfilePage />,
  },
  {
    path: pathName.FRIEND_LIST,
    element: <FriendListPage />,
  },
  {
    path: pathName.FRIEND_REQUEST,
    element: <FriendRequestPage />,
  },
  {
    path: pathName.GROUP,
    element: <GroupPage />,
  },
  {
    path: pathName.NOTIFICATION,
    element: <NotificationPage />,
  },
  {
    path: pathName.EDIT_PROFILE,
    element: <EditProfilePage />,
  },
  {
    path: pathName.EDITOR,
    element: <RichEditorPage />,
  },
  {
    path: pathName.UPLOAD,
    element: <ExampleUploadPage />,
  },
  {
    path: pathName.ACCOUNT_SETTING,
    element: <AccountSettingPage />,
  },
  {
    path: pathName.PRIVACY_SECURITY,
    element: <PrivacySecurityPage />,
  },
];
