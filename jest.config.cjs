/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.ts'],
  coverageReporters: ['clover', 'lcov'],
}

module.exports = config
