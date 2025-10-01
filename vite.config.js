import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons/si', 'react-icons/io5', 'react-icons/ai', 'react-icons/fi'],
        }
      }
    },
    minify: 'esbuild',
  },
})
