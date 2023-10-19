import { Dashboard } from '@/pages/admin/dashboard';
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
];
