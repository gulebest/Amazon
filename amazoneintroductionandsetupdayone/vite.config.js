import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174, // your desired port
        host: '127.0.0.1', // force IPv4 localhost
        strictPort: true, // fail if port busy instead of fallback
    },
})