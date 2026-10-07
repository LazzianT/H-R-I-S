import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // jangan pantau artefak build & node_modules: mengurangi beban watcher di Windows
    watch: { ignored: ['**/dist/**', '**/node_modules/**', '**/.git/**'] },
  },
  preview: { port: 4173, strictPort: true },
  // pre-bundle lib besar sekali di awal supaya tidak re-optimize saat pindah halaman
  optimizeDeps: { include: ['react', 'react-dom', 'react-router-dom', 'axios', 'recharts', 'motion'] },
});
