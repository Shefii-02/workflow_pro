import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          apexcharts: ['apexcharts'],
          reactApexcharts: ['react-apexcharts'],
          ui: ['lucide-react', 'sonner'],
          tables: ['@tanstack/react-table'],
          http: ['axios'],
        },
      },
    },
  },
})
