import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import typography from '@tailwindcss/typography';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    typography,
  ],
  server: {
    host: '0.0.0.0', // or your machine IP like '192.168.1.5'
    port: 5173,      // optional
  },
})
