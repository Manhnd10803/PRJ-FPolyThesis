import { ForgotPasswordPage } from '@/pages/un-auth/forgot-password';
import { ResetPasswordPage } from '@/pages/un-auth/forgot-password/components/form-reset-password';
import { LoginPage } from '@/pages/un-auth/login';
import { RegisterPage } from '@/pages/un-auth/register';
import { VerifyRegisterPage } from '@/pages/un-auth/verify-register';
import { pathName } from './path-name';

export const UnAuthRouter = [
  {
    path: pathName.LOGIN,
    element: <LoginPage />,
  },
  {
    path: pathName.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: pathName.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: pathName.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: pathName.VERIFY_REGISTER,
    element: <VerifyRegisterPage />,
  },
];
