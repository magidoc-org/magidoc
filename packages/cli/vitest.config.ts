/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./tests/utils.ts'],
    mockReset: true,
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
      include: ['./src'],
    },
  },
})
