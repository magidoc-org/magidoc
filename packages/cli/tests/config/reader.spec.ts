import path from 'path'
import { readConfiguration } from '../../src/config/reader'
import { fileURLToPath } from 'url'
import { describe, it, expect } from 'vitest'

describe('reading an esm configuration', () => {
  it('should read the configuration properly', async () => {
    expect(await readExample('magidoc.mjs')).toBeTruthy()
  })
})

describe('reading a cjs configuration', () => {
  it('should read the configuration properly', async () => {
    expect(await readExample('magidoc.cjs')).toBeTruthy()
  })
})

describe('reading a plain js configuration', () => {
  it('should read the configuration properly', async () => {
    expect(await readExample('magidoc.js')).toBeTruthy()
  })
})

describe('reading a file with no default export', () => {
  it('return an error', async () => {
    await expect(readExample('no-default.mjs')).rejects.toThrow(
      'has no default export',
    )
  })
})

describe('reading a file with an invalid extension', () => {
  it('return an error of unrecognized extension', async () => {
    await expect(readExample('magidoc.txt')).rejects.toThrow(
      'Unrecognized Magidoc configuration file extension',
    )
  })
})

describe('reading a file that does not exist', () => {
  it('return an error of file not found', async () => {
    await expect(readExample('not-exists.mjs')).rejects.toThrow(
      'Could not find Magidoc configuration file at path',
    )
  })
})

async function readExample(name: string) {
  return await readConfiguration(getExample(name))
}

function getExample(name: string) {
  return path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'examples',
    name,
  )
}
