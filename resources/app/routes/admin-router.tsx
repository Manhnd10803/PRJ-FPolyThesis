import { AdminLayout } from '@/layouts/admin-layout';
import { Dashboard } from '@/pages/admin/dashboard';

export const AdminRouter = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];
