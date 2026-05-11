/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    mockReset: true,
    coverage: {
      all: true,
      reporter: ['clover', 'lcov', 'html'],
      include: ['src'],
    },
  },
})
