import { fileURLToPath } from 'url'
import path from 'path'
import { parseTemplateConfig } from '../../src/template/config'

describe('parsing a valid template configuration', () => {
  it('returns the parsed config', async () => {
    const validConfig = await importConfig('valid.js')
    const parsed = parseTemplateConfig(validConfig)
    expect(parsed).toMatchObject({
      SUPPORTED_OPTIONS: expect.toBeArray() as unknown,
      SCHEMA_TARGET_LOCATION: './src/_schema.json',
      STATIC_ASSETS_LOCATION: './static',
    })
  })
})

describe('parsing an empty template configuration', () => {
  it('raises an error', async () => {
    const emptyConfig = await importConfig('empty.js')
    shouldFailParsing(emptyConfig, [
      "Expected: 'array' but received 'undefined' at path 'SUPPORTED_OPTIONS'",
      "Expected: 'string' but received 'undefined' at path 'SCHEMA_TARGET_LOCATION'",
      "Expected: 'string' but received 'undefined' at path 'STATIC_ASSETS_LOCATION'",
    ])
  })
})

describe('parsing an invalid template configuration', () => {
  it('raises an error', async () => {
    const invalidConfig = await importConfig('invalid.js')
    shouldFailParsing(invalidConfig, [
      "Expected: 'object' but received 'string' at path 'SUPPORTED_OPTIONS[0]'",
      "Expected: 'string' but received 'number' at path 'SCHEMA_TARGET_LOCATION'",
      "Expected: 'string' but received 'boolean' at path 'STATIC_ASSETS_LOCATION'",
    ])
  })
})

function shouldFailParsing(config: unknown, errors: string[]) {
  try {
    parseTemplateConfig(config)
    throw 'should-not-get-here'
  } catch (error) {
    expect(error).toBeInstanceOf(Error)

    const castedError = error as Error

    const lines = castedError.message.split('\n').map(removeAnsiColors)

    // First line's message
    expect(lines[0]).toMatch(/Invalid template configuration found:$/)

    // All error messages present are there
    expect(lines).toHaveLength(errors.length + 4)

    // All error messages are included
    expect(lines.slice(2, lines.length - 2)).toSatisfyAll((line: string) => {
      return errors.some((expected) => line.includes(expected))
    })
  }
}

async function importConfig(name: string): Promise<unknown> {
  return (await import(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'config-examples',
      name,
    )
  )) as unknown
}
