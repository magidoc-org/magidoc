const { defineConfig } = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const shebang = require('rollup-plugin-preserve-shebang')

module.exports = defineConfig({
  input: ['src/index.ts'],
  plugins: [shebang(), typescript()],
  external: [
    '@magidoc/rollup-plugin-fetch-gql-schema',
    '@magidoc/rollup-plugin-parse-gql-schema',
    '@magidoc/plugin-starter-variables',
    'commander',
    'axios',
    'extract-zip',
    'listr2',
    'child_process',
    'util',
    'fs',
    'fs-extra',
    'fs/promises',
    'os',
    'path',
    'js-yaml',
    'zod',
    'url',
    'sirv',
    'http',
    'lodash',
    'chokidar',
  ],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
})
