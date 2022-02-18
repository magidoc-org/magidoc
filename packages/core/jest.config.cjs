/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ["**/__tests__/**/*.spec.ts"],
  testEnvironment: 'node',
  collectCoverage: true,
  setupFilesAfterEnv: ['./test/schema.setup.js'],
}
