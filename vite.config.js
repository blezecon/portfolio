import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Include GLB files as assets
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  
  // Resolve path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  
  // Configure server options
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Build options
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
        },
      },
    },
  },
  
  // Optimize dependencies - this helps with Three.js
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
    exclude: [],
  },
  
  // Enable detailed build info
  stats: 'verbose',
  
  // Configure CSS
  css: {
    // Process CSS with PostCSS
    postcss: './postcss.config.js',
    // Generate CSS modules
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase',
    },
  },
});