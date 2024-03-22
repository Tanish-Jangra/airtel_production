import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // or use your local IP address
    port: 3000, // or any other port you prefer
    open: true, // open the application in the default browser
    cache: false,
    proxy: {
        // proxy configuration if needed
    },
},
})
