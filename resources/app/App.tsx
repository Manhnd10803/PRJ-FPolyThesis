import './bootstrap';

import Router from '@/routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/provider';

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
