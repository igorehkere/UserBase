import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import Cookies from 'js-cookie';
import { env } from './env';

type props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${env.VITE_BACKEND_TRPC_URL}/trpc`,
      headers: () => {
        const token = Cookies.get('token');
        return {
          ...(token && { authorization: `Bearer ${token}` }),
        };
      },
    }),
    loggerLink({
      enabled: () => env.NODE_ENV === 'development'
    })
  ],
});

export const TrpcProvider = ({ children }: props) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
