const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [typescript()],
  external: [
    'lodash',
    'graphql',
    'prettier/standalone',
    'prettier/parser-graphql',
  ],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
