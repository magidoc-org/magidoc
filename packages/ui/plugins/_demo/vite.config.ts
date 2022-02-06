import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      isProduction: false,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@core',
        replacement: path.resolve(__dirname, '../../../core/src'),
      },
    ],
  },
})
