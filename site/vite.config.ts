import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Gursa/',
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
})
