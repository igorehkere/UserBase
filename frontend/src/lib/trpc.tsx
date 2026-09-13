import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, type TRPCLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import Cookies from 'js-cookie';
import { env } from './env';
import type { TrpcRouter } from '@authwithback/backend/src/router';
import { sentryCaptureException } from './sentry';
import { observable } from '@trpc/server/observable';

type props = {
  children: React.ReactNode;
};

const customTrpcLink: TRPCLink<TrpcRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(error) {
          if (env.NODE_ENV !== 'development') {
            console.error(error);
          }
          sentryCaptureException(error);
          observer.error(error);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
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
    customTrpcLink,
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
      enabled: () => env.NODE_ENV === 'development',
    }),
  ],
});

export const TrpcProvider = ({ children }: props) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
