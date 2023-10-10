/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./tests/schema.setup.ts'],
    mockReset: true,
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
      include: ['./src'],
    },
  },
})
