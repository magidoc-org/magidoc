jest.mock('../src/commands/utils/import-meta', () => ({
  importMetaUrl: () => `file://${__filename}`,
}))

jest.mock('chalk', () => ({
  red: (input: string) => input,
  cyan: (input: string) => input,
}))

export {}
