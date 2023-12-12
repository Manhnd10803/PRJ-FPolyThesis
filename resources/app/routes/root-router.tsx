import { AuthGuard } from '@/components/guard';
import { AuthLayout, ChatLayout, UnAuthLayout } from '@/layouts/';
import Error404 from '@/layouts/others/error-404';
import Error500 from '@/layouts/others/error-500';
import { Outlet } from 'react-router-dom';
import { AuthRouter as AuthRouterConfig } from './auth-router';
import { ChatRouter } from './chat-route';
import { pathName } from './path-name';
import { UnAuthRouter } from './un-auth-router';

//Can add more auth router here
export const RootAuthRouter = (() => {
  const AuthRouter = AuthRouterConfig.filter(route => !(route.noRightSidebar || route.noLayout));

  const AuthRouterNoSidebar = AuthRouterConfig.filter(route => route.noRightSidebar && !route.noLayout);

  const AuthRouterNoLayout = AuthRouterConfig.filter(route => route.noLayout && !route.noRightSidebar);

  return [
    {
      path: '/',
      element: (
        <AuthGuard>
          <AuthLayout />
        </AuthGuard>
      ),
      children: [...AuthRouter],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <AuthLayout hasRightSidebar={false} />
        </AuthGuard>
      ),
      children: [...AuthRouterNoSidebar],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [...AuthRouterNoLayout],
    },
  ];
})();

export const RootChatRouter = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <ChatLayout />
      </AuthGuard>
    ),
    children: [...ChatRouter],
  },
];

// Can add more router start with / here
export const RootUnAuthRouter = [
  {
    path: '/',
    element: <UnAuthLayout />,
    children: [...UnAuthRouter],
  },
];

// Can add more router start with / here
export const OthersRouter = [
  {
    path: pathName.ERROR_500,
    element: <Error500 />,
  },
  {
    path: '/*',
    element: <Error404 />,
  },
];
