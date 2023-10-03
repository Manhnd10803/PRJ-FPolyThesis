import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/app/styles/index.scss', 'resources/app/index.tsx'],
      refresh: true,
    }),
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/app'),
    },
  },
});
