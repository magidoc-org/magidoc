const base = require('../../../.eslintrc.cjs')

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: [__dirname + '/tsconfig.json'],
  },
  settings: {
    'svelte3/ignore-warnings': (test) => {
      if (test.code === 'unused-export-let') return true
      return false
    },
  },
}
