import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'query-generator',
      formats: ['es'],
    },
  },
  resolve: {
    alias: [
      {
        find: '@core',
        replacement: path.resolve(__dirname, '../../../core/src'),
      },
    ],
  },
})
