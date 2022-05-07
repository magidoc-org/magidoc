import path from 'path'
import { readConfiguration } from '../../src/config/read'

describe('reading an esm configuration', () => {
  it('should read the configuration properly', async () => {
    expect(await readExample('magidoc.mjs')).toBeTruthy()
  })
})

describe('reading a cjs configuration', () => {
  it('should read the configuration properly', async () => {
    // expect(await readExample('magidoc.cjs')).toBeTruthy()
  })
})

describe('reading a plain js configuration', () => {
  it('should read the configuration properly', async () => {
    // expect(await readExample('magidoc.js')).toBeTruthy()
  })
})

async function readExample(name: string) {
  return await readConfiguration(getExample(name))
}

function getExample(name: string) {
  return path.join(__dirname, 'examples', name)
}
