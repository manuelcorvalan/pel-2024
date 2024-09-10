import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devtool: 'source-map',
  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker
    proxy : {
        '^/api/login': {
        target: 'https://api.cne.cl',
        ws: true,
        changeOrigin: true
      },
      '^/api/v4/estaciones':{
        target: 'https://api.cne.cl',
        ws: true,
        changeOrigin: true
      },
      '^/api/marca_ciudadano':{
        target: 'https://api.bencinaenlinea.cl',
        ws: true,
        changeOrigin: true
      },
      '^/api/region':{
        target: 'https://api.bencinaenlinea.cl',
        ws: true,
        changeOrigin: true
      },
      '^/api/comuna':{
        target: 'https://api.bencinaenlinea.cl',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
