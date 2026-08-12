import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Any request our React code makes to "/api/..." gets forwarded to the Spring Boot
    // backend on port 8080. This avoids CORS headaches during development - the browser
    // thinks it's talking to itself (localhost:5173), while Vite quietly relays the
    // request to localhost:8080 behind the scenes.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
