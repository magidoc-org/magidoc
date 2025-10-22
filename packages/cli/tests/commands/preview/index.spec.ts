import fs from 'fs'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import preview from '../../../src/commands/preview'

let server: http.Server

const port = 34245

function closeServer(): Promise<void> {
  server.closeAllConnections()
  return new Promise((resolve) => {
    // Node bug...
    // https://github.com/nodejs/node/issues/47130#issuecomment-2018883424
    server.close(() => setTimeout(resolve, 10))
  })
}

describe('running a preview server', () => {
  describe('without site root', () => {
    beforeAll(() => {
      server = preview({
        websiteLocation: fakeOutputLocation(),
        port: port,
        siteRoot: undefined,
      })
    })

    afterAll(async () => {
      await closeServer()
    })

    it('should return the index when queried on root path', async () => {
      expect(await getAsset()).toBe(expectedIndex())
    })

    it('should return the other html files without the extension', async () => {
      expect(await getAsset('/other')).toBe(expectedOtherHtml())
    })

    it('should return the other assets even nested in a directory', async () => {
      expect(await getAsset('/directory/asset.css')).toBe(expectedAsset())
    })
  })

  describe('with site root', () => {
    beforeAll(() => {
      server = preview({
        websiteLocation: fakeOutputLocation(),
        port: port,
        siteRoot: '/docs',
      })
    })

    afterAll(async () => {
      await closeServer()
    })

    it('should redirect to the website root path when queried on the root', async () => {
      expect(await getRedirectLocation()).toBe('/docs')
    })

    it('should return the index when queried on the site root', async () => {
      expect(await getAsset('/docs')).toBe(expectedIndex())
    })

    it('should return the other html files without the extension', async () => {
      expect(await getAsset('/docs/other')).toBe(expectedOtherHtml())
    })

    it('should return the other assets even nested in a directory', async () => {
      expect(await getAsset('/docs/directory/asset.css')).toBe(expectedAsset())
    })
  })

  describe('and port is already used', () => {
    beforeAll(() => {
      server = preview({
        websiteLocation: fakeOutputLocation(),
        port: port,
      })
    })

    afterAll(() => {
      server.close()
    })

    it('should not open the second server', () => {
      const newServer = preview({
        websiteLocation: fakeOutputLocation(),
        port: port,
      })
      expect(server.listening)
      expect(newServer.listening)
    })
  })
})

function getAsset(path?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          hostname: 'localhost',
          port: port,
          path: path,
        },
        (response) => {
          response.on('data', (data) => {
            resolve(String(data))
          })
        },
      )
      .on('error', (error) => {
        reject(error)
      })
  })
}

function getRedirectLocation(): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          hostname: 'localhost',
          port: port,
        },
        (response) => {
          resolve(response.headers.location)
        },
      )
      .on('error', (error) => {
        reject(error)
      })
  })
}

function expectedIndex(): string {
  return fs.readFileSync(path.join(currentPath(), 'fake-output', 'index.html')).toString()
}

function expectedOtherHtml(): string {
  return fs.readFileSync(path.join(currentPath(), 'fake-output', 'other.html')).toString()
}

function expectedAsset(): string {
  return fs.readFileSync(path.join(currentPath(), 'fake-output', 'directory', 'asset.css')).toString()
}

function fakeOutputLocation(): string {
  return path.join(currentPath(), 'fake-output')
}

function currentPath(): string {
  return path.dirname(fileURLToPath(import.meta.url))
}
