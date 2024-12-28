import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/Api':{
        target:'http://127.0.0.1:8000/api',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/Api/,''),
      },
      '/Image':{
        target:'http://127.0.0.1:8000/storage',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/Image/,'')
      },
    },
  },
})
