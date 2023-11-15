import { AuthGuard } from '@/components/guard';
import { AuthLayout, ChatLayout, UnAuthLayout } from '@/layouts/';
import { AuthRouteType } from '@/models/routes';
import { ChatRouter } from './chat-route';
import { AuthRouter as AuthRouterConfig } from './auth-router';
import { UnAuthRouter } from './un-auth-router';

//Can add more auth router here
export const RootAuthRouter = (() => {
  const noRightSidebar = (route: AuthRouteType) => route.noRightSidebar;

  const AuthRouter = AuthRouterConfig.filter(route => !noRightSidebar(route));
  const AuthRouterNoSidebar = AuthRouterConfig.filter(noRightSidebar);

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
