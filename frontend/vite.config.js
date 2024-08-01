import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
  /*  proxy : {
      "/signUp" : "http://localhost:8000",
    },*/
  },
  build: {
    // Specify the output directory for your production build
    outDir: 'dist', // Ensure this matches the directory your Express server serves
  },
  plugins: [react()],
})
