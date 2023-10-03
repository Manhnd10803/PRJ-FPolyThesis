import './bootstrap';

import { ThemeProvider } from '@/components/provider/theme-provider';
import Router from '@/routes/Routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
