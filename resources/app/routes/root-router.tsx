import { AdminLayout } from '@/layouts/admin-layout';
import { ClientLayout } from '@/layouts/';
import { AdminRouter } from './admin-router';
import { ClientRouter } from './client-router';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { ForgotPasswordPage } from '@/pages/forgot-password';

//Can add more client router here
export const RootClientRouter = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [...ClientRouter],
  },
];

//Can add more admin router here
export const RootAdminRouter = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [...AdminRouter],
  },
];

// Can add more router start with / here
export const RootSimpleRouter = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'forgot_password',
    element: <ForgotPasswordPage />,
  }
];
