const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [typescript()],
  external: ['fs', 'graphql', 'path', 'fs/promises', 'glob'],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
