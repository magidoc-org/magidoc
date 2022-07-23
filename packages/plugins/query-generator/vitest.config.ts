/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./tests/global.setup.ts', './tests/schema.setup.ts'],
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
    },
  },
})
