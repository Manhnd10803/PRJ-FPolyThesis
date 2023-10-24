import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store/store';
import { TooltipProvider } from './components/plate-ui/tooltip';

const queryClient = new QueryClient();

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ReactQueryDevtools position="bottom-right" />
        <TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
          {children}
        </TooltipProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
