import { Dashboard } from '@/pages/admin/dashboard';

export const AdminRouter = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
];
