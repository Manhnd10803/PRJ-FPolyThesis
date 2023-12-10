import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './AppProvider';
import { Fallback } from './Fallback';
import { OthersRouter, RootAuthRouter, RootChatRouter, RootUnAuthRouter } from './routes';

//Define all routes here
const routes: RouteObject[] = [...RootAuthRouter, ...RootUnAuthRouter, ...RootChatRouter, ...OthersRouter];

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
        </App>
      </ErrorBoundary>
    </AppProvider>
  </StrictMode>,
);
