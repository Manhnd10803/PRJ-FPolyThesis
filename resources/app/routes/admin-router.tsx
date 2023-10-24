import { Dashboard } from '@/pages/admin/dashboard';
import { UserPage } from '@/pages/admin/user';
import { ProfileAdminPage } from '@/pages/admin/user/profile';

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
    path: 'users/profile/:id',
    element: <ProfileAdminPage />,
  },
];
