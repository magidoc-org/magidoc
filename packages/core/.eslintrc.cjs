const base = require('../../.eslintrc.js')

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: [__dirname + '/tsconfig.json'],
  },
}
