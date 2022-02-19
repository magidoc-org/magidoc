/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/*.spec.ts'],
  collectCoverage: true,
  setupFilesAfterEnv: [
    '<rootDir>/tests/global.setup.ts',
    '<rootDir>/tests/schema.setup.ts',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
