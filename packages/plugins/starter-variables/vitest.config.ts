/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./tests/utils.ts'],
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
    },
  },
})
