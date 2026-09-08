import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { parsePublicEnv } from './src/lib/parsePublicEnv';

/// <reference types="vite-plugin-svgr/client" />

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const publicEnv = parsePublicEnv(env);
  return {
    plugins: [react(), svgr()],
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
    define: {
      'process.env': publicEnv
    }
  };
});
