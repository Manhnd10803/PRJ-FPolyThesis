import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    minify: true,
    outDir: 'dist',
  },
  plugins: [
    laravel({
      input: ['resources/app/assets/scss/index.scss', 'resources/app/index.tsx', 'resources/js/app.js'],
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
      '@': path.resolve(__dirname, './resources/app'),
    },
  },
});
