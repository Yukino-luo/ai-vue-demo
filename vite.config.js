import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  base: '/ai-vue-demo/',
  plugins: [vue()],
  resolve: {
  }
})
