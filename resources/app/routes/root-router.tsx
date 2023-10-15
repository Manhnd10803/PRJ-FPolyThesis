import { AdminLayout, ClientLayout } from '@/layouts/';
import { AdminRouter } from './admin-router';
import { ClientRouter } from './client-router';
import { AuthRouter } from './auth-router';
import { AuthLayout } from '@/layouts/auth/auth-layout';

//Can add more client router here
export const RootClientRouter = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [...ClientRouter],
  },
];

//Can add more admin router here``
export const RootAdminRouter = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [...AdminRouter],
  },
];

// Can add more router start with / here
export const RootAuthRouter = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [...AuthRouter],
  },
];
