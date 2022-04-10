const base = require('../../../jest.config.cjs')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...base,
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/tests/schema.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
