import os from 'node:os'
import path from 'node:path'
import { zipSync } from 'fflate'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { unzipTemplate } from '../../src/template/unzip'

describe('unzipping a template', () => {
  let dir: string
  let destination: string
  let zipLocation: string

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'magidoc-unzip-'))
    destination = path.join(dir, 'out')
    zipLocation = path.join(dir, 'template.zip')
  })

  afterEach(async () => {
    await fs.remove(dir)
  })

  it('extracts files and folders', async () => {
    await fs.writeFile(
      zipLocation,
      zipSync({
        'package.json': new TextEncoder().encode('{}'),
        'src/routes/page.svelte': new TextEncoder().encode('<h1>hi</h1>'),
        // A key without a trailing slash makes fflate emit a 'static/' entry, like archiver does
        static: {},
      }),
    )

    await unzipTemplate({ zipLocation, destination })

    expect(await fs.readFile(path.join(destination, 'package.json'), 'utf8')).toBe('{}')
    expect(await fs.readFile(path.join(destination, 'src/routes/page.svelte'), 'utf8')).toBe('<h1>hi</h1>')
    expect((await fs.stat(path.join(destination, 'static'))).isDirectory()).toBe(true)
  })

  it('refuses entries that escape the destination without writing anything', async () => {
    await fs.writeFile(
      zipLocation,
      zipSync({
        'package.json': new TextEncoder().encode('{}'),
        '../evil.txt': new TextEncoder().encode('pwned'),
      }),
    )

    await expect(unzipTemplate({ zipLocation, destination })).rejects.toThrow(/outside of/)
    expect(await fs.pathExists(path.join(dir, 'evil.txt'))).toBe(false)
    expect(await fs.pathExists(destination)).toBe(false)
  })

  it.each([
    ['with', false],
    ['without', true],
  ])('decodes non-ASCII names %s the UTF-8 flag', async (_, clearFlag) => {
    const zip = Buffer.from(zipSync({ 'café.md': new TextEncoder().encode('hi') }))
    if (clearFlag) {
      // Clear bit 11 in the local and central headers, as some zip tools leave it unset
      for (const [signature, offset] of [
        ['PK\x03\x04', 6],
        ['PK\x01\x02', 8],
      ] as const) {
        const at = zip.indexOf(signature, 0, 'latin1') + offset
        zip.writeUInt16LE(zip.readUInt16LE(at) & ~0x800, at)
      }
    }
    await fs.writeFile(zipLocation, zip)

    await unzipTemplate({ zipLocation, destination })

    expect(await fs.readdir(destination)).toEqual(['café.md'])
  })

  it('creates the destination for an empty archive', async () => {
    await fs.writeFile(zipLocation, zipSync({}))

    await unzipTemplate({ zipLocation, destination })

    expect((await fs.stat(destination)).isDirectory()).toBe(true)
  })
})
