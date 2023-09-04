import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'https://3afd-2800-e2-5980-eeb-00-3.ngrok.io', // Reemplaza con tu URL de ngrok
        ws: true
      }
    }
  }
})
