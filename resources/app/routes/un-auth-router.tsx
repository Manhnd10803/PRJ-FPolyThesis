import { ForgotPasswordPage } from '@/pages/forgot-password';
import { ResetPasswordPage } from '@/pages/forgot-password/components/form-reset-password';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { VerifyRegisterPage } from '@/pages/verify-register';

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
