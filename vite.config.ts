import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // If you're using path.resolve

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), //  <--  This is the important part
      // ... other aliases if you have them
    },
  },
  css: {
    postcss: './postcss.config.js', // Ensure PostCSS is configured if used
  },
})
