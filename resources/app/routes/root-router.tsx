import { AdminLayout, ClientLayout } from '@/layouts/';
import { AdminRouter } from './admin-router';
import { ClientRouter as ClientRouterConfig } from './client-router';
import { AuthRouter } from './auth-router';
import { AuthLayout } from '@/layouts/auth/auth-layout';
import { ClientRouteType } from '@/models/routes';
import { ChatLayout } from '@/layouts/chat/chat-layout';
import { ChatRouter } from './chat-route';

//Can add more client router here
export const RootClientRouter = (() => {
  const noRightSidebar = (route: ClientRouteType) => route.noRightSidebar;

  const ClientRouter = ClientRouterConfig.filter(route => !noRightSidebar(route));
  const ClientRouterNoSidebar = ClientRouterConfig.filter(noRightSidebar);

  return [
    {
      path: '/',
      element: <ClientLayout />,
      children: [...ClientRouter],
    },
    {
      path: '/',
      element: <ClientLayout hasRightSidebar={false} />,
      children: [...ClientRouterNoSidebar],
    },
  ];
})();

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
export const RootChatRouter = [
  {
    path: '/',
    element: <ChatLayout />,
    children: [...ChatRouter],
  },
];
