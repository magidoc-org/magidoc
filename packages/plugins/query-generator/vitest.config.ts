/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./tests/global.setup.ts', './tests/schema.setup.ts'],
    mockReset: true,
    coverage: {
      reporter: ['clover', 'lcov', 'html'],
      include: ['src'],
    },
  },
})
