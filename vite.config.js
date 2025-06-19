import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/Arch-a-Track/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})