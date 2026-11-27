import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server forwards /api requests to Django, so the browser sees a
// single origin and no CORS configuration is needed during development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
});
