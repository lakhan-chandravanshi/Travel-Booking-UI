import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
  build: {
    rollupOptions: {
      output: {
        // Split large, stable vendor libs into their own cacheable chunks.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          vendor: ['axios', 'date-fns', 'lucide-react', 'react-hot-toast', 'react-dropzone'],
        },
      },
    },
  },
});
