const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [typescript()],
  external: ['fs', 'graphql', 'axios', 'fast-glob', 'fs/promises'],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
