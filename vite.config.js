import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration file
export default defineConfig({
  plugins: [react()], // React plugin for Vite
  server: {
    host: '0.0.0.0', // Allow access from all network interfaces
    port: 5555, // Port where the development server will run
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Target Node.js server for API requests
        changeOrigin: true, // Adjust the origin of the request to match the target
      },
    },
  },
});
