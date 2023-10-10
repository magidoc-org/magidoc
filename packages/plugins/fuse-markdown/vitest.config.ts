/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    mockReset: true,
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
      include: ['./src'],
    },
  },
})
