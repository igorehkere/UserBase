import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { TrpcProvider } from './lib/trpc.tsx';

createRoot(document.getElementById('root')!).render(
  <TrpcProvider>
    <App />
  </TrpcProvider>
);
