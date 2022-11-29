const base = require('../../../.eslintrc.cjs')

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: [__dirname + '/tsconfig.json'],
  },
}
