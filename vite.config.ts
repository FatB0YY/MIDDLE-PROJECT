import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        icon: true,
        typescript: true
      }
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API_URL__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('client')
  }
})
