import { defineConfig } from 'vite';
import { serviceWorker } from './build/service-worker.js';
import { uiCycle } from './build/ui-cycle.js';

// Relative base so the build works on GitHub Pages project sites
// (served from /Learn-Luganda/) and locally without changes.
export default defineConfig({
  base: './',
  plugins: [uiCycle(), serviceWorker()],
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
    setupFiles: ['tests/setup.js'],
    // Some tests build every lesson in the course, which grows with each unit.
    testTimeout: 30_000,
  },
});
