import { StrictMode } from 'react';

import '@/styles/index.scss';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store/store';
import { RootAdminRouter, RootClientRouter, RootSimpleRouter } from './routes';

//Define all routes here
const routes: RouteObject[] = [...RootClientRouter, ...RootAdminRouter, ...RootSimpleRouter];

const router = createBrowserRouter(routes, {
  // basename: process.env.PUBLIC_URL,
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </ReduxProvider>
  </StrictMode>,
);
