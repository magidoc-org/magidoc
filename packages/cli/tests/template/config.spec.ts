import { fileURLToPath } from 'url'
import path from 'path'
import {
  loadTemplateConfig,
  type RawMagidocTemplateConfig,
} from '../../src/template/config'
import { describe, it, expect } from 'vitest'

describe('parsing a valid template configuration', () => {
  it('returns the parsed config', async () => {
    const parsed = await execute('valid.js')
    expect(parsed).toMatchObject({
      SUPPORTED_OPTIONS: expect.any(Array) as unknown,
      SCHEMA_TARGET_LOCATION: './src/_schema.graphqls',
      STATIC_ASSETS_LOCATION: './static',
      ENV_FILE_LOCATION: './.env',
    })
  })
})

describe('parsing an empty template configuration', () => {
  it('raises an error', async () => {
    await shouldFailParsing('empty.js', [
      "Expected: 'array' but received 'undefined' at path 'SUPPORTED_OPTIONS'",
      "Expected: 'string' but received 'undefined' at path 'SCHEMA_TARGET_LOCATION'",
      "Expected: 'string' but received 'undefined' at path 'STATIC_ASSETS_LOCATION'",
      "Expected: 'string' but received 'undefined' at path 'ENV_FILE_LOCATION'",
    ])
  })
})

describe('parsing an invalid template configuration', () => {
  it('raises an error', async () => {
    await shouldFailParsing('invalid.js', [
      "Expected: 'object' but received 'string' at path 'SUPPORTED_OPTIONS[0]'",
      "Expected: 'string' but received 'number' at path 'SCHEMA_TARGET_LOCATION'",
      "Expected: 'string' but received 'boolean' at path 'STATIC_ASSETS_LOCATION'",
    ])
  })
})

async function shouldFailParsing(name: string, errors: string[]) {
  try {
    await execute(name)
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
    lines.slice(2, lines.length - 2).forEach((line: string) => {
      expect(line).toSatisfy(() => {
        return errors.some((expected) => line.includes(expected))
      })
    })
  }
}

function execute(name: string): Promise<RawMagidocTemplateConfig> {
  return loadTemplateConfig(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'config-examples',
      name,
    ),
  )
}
