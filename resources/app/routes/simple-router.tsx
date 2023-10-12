import {SignupPage} from '@/pages/Signup';
import {LoginPage} from '@/pages/login';

export const SimpleRouter = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignupPage />,
  },
];
