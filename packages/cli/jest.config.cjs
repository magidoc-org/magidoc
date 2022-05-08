const base = require('../../jest.config.cjs')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  ...base,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['jest-extended/all'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.json',
    },
  },
}

module.exports = config
