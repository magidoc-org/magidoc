const base = require('../../jest.config.cjs')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  ...base,
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/tests/global.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(chalk)/)'],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}

module.exports = config
