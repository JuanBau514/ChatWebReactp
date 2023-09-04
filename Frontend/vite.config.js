import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://78c5-2800-e2-5980-eeb-00-3.ngrok-free.app',
        ws: true
      }
    }
  }
})

