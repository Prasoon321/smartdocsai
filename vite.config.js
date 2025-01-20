import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@react-pdf-viewer/core', 'pdfjs-dist'], // Pre-bundle these libraries
  },
  resolve: {
    alias: {
      'pdfjs-dist': 'pdfjs-dist/build/pdf', // Use the ES5-compatible build
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /pdfjs-dist/], // Include necessary CommonJS modules
      transformMixedEsModules: true, // Handle mixed ES modules and CommonJS syntax
    },
  },
});
