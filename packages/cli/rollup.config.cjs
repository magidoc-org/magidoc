const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const shebang = require('rollup-plugin-preserve-shebang')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [shebang(), typescript()],
  external: ['commander', 'fs', 'axios', 'tmp', 'extract-zip'],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
