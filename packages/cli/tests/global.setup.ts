jest.mock('../src/commands/utils/import-meta', () => ({
  importMetaUrl: () => `file://${__filename}`,
}))

export {}
