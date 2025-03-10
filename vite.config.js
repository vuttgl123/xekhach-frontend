import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    'process.env': process.env, // 🔥 Đảm bảo Vite đọc biến môi trường từ `.env`
  },
});
