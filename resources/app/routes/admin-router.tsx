import { BlogList } from '@/pages/admin/blog';
import { BlogPending } from '@/pages/admin/blog-pending';
import { Dashboard } from '@/pages/admin/dashboard';
import { PostList } from '@/pages/admin/post';
import UserPage from '@/pages/admin/user';

export const AdminRouter = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'users',
    element: <UserPage />,
  },
  {
    path: 'posts',
    element: <PostList />,
  },
  {
    path: 'blogs-pending',
    element: <BlogPending />,
  },
  {
    path: 'blogs',
    element: <BlogList />,
  },
];
