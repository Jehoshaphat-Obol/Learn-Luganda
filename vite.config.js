import { defineConfig } from 'vite';

// Relative base so the build works on GitHub Pages project sites
// (served from /Learn-Luganda/) and locally without changes.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
});
