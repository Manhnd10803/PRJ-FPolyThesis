import './bootstrap';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from '@/components/providers/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
