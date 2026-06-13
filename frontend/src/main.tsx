import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { TrpcProvider } from './lib/trpc.tsx';
import { AppContextProvider } from './lib/ctx.tsx';

createRoot(document.getElementById('root')!).render(
  <TrpcProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </TrpcProvider>
);
