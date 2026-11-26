import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
  const { PORT = '3001' } = loadEnv(mode, projectRoot, 'PORT');
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      strictPort: true,
      proxy: { '/api': `http://127.0.0.1:${PORT}` },
    },
  };
});
