import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import eslint from "@rollup/plugin-eslint"
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{
      ...eslint(),
      enforce: 'pre'
    },
    svg(),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
