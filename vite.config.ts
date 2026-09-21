import react from '@vitejs/plugin-react'
import path from 'node:path';
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  /* مسار النشر: "/" محلّيّاً، ويُضبط من VITE_BASE عند النشر تحت مسارٍ فرعيّ مثل GitHub Pages */
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
