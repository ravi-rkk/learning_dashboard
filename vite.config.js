import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { notesApiPlugin } from './vite-plugin-notes-api.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    notesApiPlugin(),
  ],
})
