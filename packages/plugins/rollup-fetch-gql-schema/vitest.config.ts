/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
    },
  },
})
