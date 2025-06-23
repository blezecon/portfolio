import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.cur'], // Add this line to include .cur files as assets
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})