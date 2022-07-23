/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./tests/schema.setup.ts'],
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
    },
  },
})
