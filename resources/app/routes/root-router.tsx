//layouts

import { DefaultLayout } from '@/layouts/default-layout';
import { ClientRouter } from './client-router';

export const RootRouter = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [...ClientRouter], //can add more router start with / here
  },
];
