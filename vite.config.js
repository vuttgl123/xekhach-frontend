import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load biến môi trường từ `.env`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: "/",
    define: {
      'process.env': env, // 🔥 Giúp Vite đọc được `.env`
    },
  };
});
