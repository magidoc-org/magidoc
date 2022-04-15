const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [typescript()],
  external: ['graphql'],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
