import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { RootAuthRouter, RootUnAuthRouter, RootChatRouter } from './routes';
import { AppProvider } from './AppProvider';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './Fallback';

//Define all routes here
const routes: RouteObject[] = [...RootAuthRouter, ...RootUnAuthRouter, ...RootChatRouter];

const router = createBrowserRouter(routes, {
  // basename: process.env.PUBLIC_URL,
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={details => {
          console.log('ErrorBoundary', details);
          // Reset the state of your app so the error doesn't happen again
        }}
      >
        <App>
          <RouterProvider router={router} />
          <Toaster />
        </App>
      </ErrorBoundary>
    </AppProvider>
  </StrictMode>,
);
