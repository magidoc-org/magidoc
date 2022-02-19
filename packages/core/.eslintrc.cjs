const base = require('../../.eslintrc.js')

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: ['./tsconfig.json'],
  },
}
