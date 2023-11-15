import { ForgotPasswordPage } from '@/pages/un-auth/forgot-password';
import { ResetPasswordPage } from '@/pages/un-auth/forgot-password/components/form-reset-password';
import { LoginPage } from '@/pages/un-auth/login';
import { RegisterPage } from '@/pages/un-auth/register';
import { VerifyRegisterPage } from '@/pages/un-auth/verify-register';

export const UnAuthRouter = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'get-forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'get-reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'verify-register',
    element: <VerifyRegisterPage />,
  },
];
