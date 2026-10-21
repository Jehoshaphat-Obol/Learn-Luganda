import { defineConfig } from 'vite';
import { serviceWorker } from './build/service-worker.js';

// Relative base so the build works on GitHub Pages project sites
// (served from /Learn-Luganda/) and locally without changes.
export default defineConfig({
  base: './',
  plugins: [serviceWorker()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        illustrations: 'illustrations.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
  },
});
