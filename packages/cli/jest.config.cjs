const base = require('../../jest.config.cjs')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  ...base,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/tests/global.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@magidoc/plugin-starter-variables)/)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}

module.exports = config
