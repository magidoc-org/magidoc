const base = require('../../.eslintrc.cjs')

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    ignorePatterns: [
      ...base.ignorePatterns,
      './docs',
    ],
    project: [__dirname + '/tsconfig.json'],
  },
}
