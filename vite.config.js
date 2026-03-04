import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wellbeing: resolve(__dirname, 'themes/wellbeing.html'),
        respond: resolve(__dirname, 'themes/respond.html'),
        workplace: resolve(__dirname, 'themes/workplace.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
