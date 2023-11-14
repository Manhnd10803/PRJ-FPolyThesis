import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Đặt false nếu không muốn refetch lại khi focus vào tab
      retry: 0,
    },
  },
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ReactQueryDevtools position="bottom-left" />
        {children}
      </ReduxProvider>
    </QueryClientProvider>
  );
};
