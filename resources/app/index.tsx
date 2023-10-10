import { StrictMode } from 'react';

import '@/styles/index.scss';
import ReactDOM from 'react-dom/client';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import { AdminRouter, RootRouter, SimpleRouter } from './routes';

//define all routes here
const routes: RouteObject[] = [...RootRouter, ...SimpleRouter, ...AdminRouter];

const router = createBrowserRouter(routes, {
  // basename: process.env.PUBLIC_URL,
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
