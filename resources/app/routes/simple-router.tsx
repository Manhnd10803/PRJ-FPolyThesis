import RegisterPage from '@/pages/Signup';
import LoginPage from '@/pages/Login';

export const SimpleRouter = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
];
