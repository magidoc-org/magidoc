const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const shebang = require('rollup-plugin-preserve-shebang')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [shebang(), typescript()],
  external: [
    '@magidoc/rollup-plugin-fetch-gql-schema',
    '@magidoc/plugin-starter-variables',
    'commander',
    'axios',
    'extract-zip',
    'listr2',
    'child_process',
    'util',
    'fs',
    'fs-extra',
    'os',
    'path',
    'js-yaml',
    'zod',
    'url',
  ],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
