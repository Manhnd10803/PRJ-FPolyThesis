import { AdminLayout, ClientLayout } from '@/layouts/';
import { AdminRouter } from './admin-router';
import { ClientRouter as ClientRouterConfig } from './client-router';
import { UnAuthRouter } from './un-auth-router';
import { UnAuthLayout } from '@/layouts/un-auth/un-auth-layout';
import { ClientRouteType } from '@/models/routes';
import { ChatLayout } from '@/layouts/chat/chat-layout';
import { ChatRouter } from './chat-route';
import { AuthGuard } from '@/components/guard';

//Can add more client router here
export const RootClientRouter = (() => {
  const noRightSidebar = (route: ClientRouteType) => route.noRightSidebar;

  const ClientRouter = ClientRouterConfig.filter(route => !noRightSidebar(route));
  const ClientRouterNoSidebar = ClientRouterConfig.filter(noRightSidebar);

  return [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ClientLayout />
        </AuthGuard>
      ),
      children: [...ClientRouter],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <ClientLayout hasRightSidebar={false} />
        </AuthGuard>
      ),
      children: [...ClientRouterNoSidebar],
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

//Can add more admin router here``
export const RootAdminRouter = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [...AdminRouter],
  },
];
