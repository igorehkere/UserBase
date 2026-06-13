import type { TrpcRouterOutput } from '@authwithback/backend/src/router';
import { createContext, useContext } from 'react';
import { trpc } from '../utils/trpc';
import { Loader } from '../components/Loader';

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me'];
};
type props = {
  children: React.ReactNode;
};

const AppReactContext = createContext<AppContext>({
  me: null,
});

export const AppContextProvider = ({ children }: props) => {
  const { data, isLoading, isFetching, isError, error } = trpc.getMe.useQuery();
  return (
    <AppReactContext.Provider
      value={{
        me: data?.me || null,
      }}
    >
      {isLoading || isFetching ? <Loader type='page' /> : isError ? <div>Ошибка: {error.message}</div> : children}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppReactContext);
};

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
