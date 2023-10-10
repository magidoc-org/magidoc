import path from 'path'
import { fileURLToPath } from 'url'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import fs from 'fs'
import http from 'http'
import preview from '../../../src/commands/preview'

let server: http.Server

const port = 34245

describe('running a preview server', () => {
  describe('without site root', () => {
    beforeAll(() => {
      server = preview({
        websiteLocation: fakeOutputLocation(),
        port: port,
        siteRoot: undefined,
      })
    })

    afterAll(() => {
      server.closeAllConnections()
      server.close()
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

    afterAll(() => {
      server.close()
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
    const req = http.request(
      {
        hostname: 'localhost',
        port: port,
        method: 'GET',
        path: path,
      },
      (response) => {
        response.on('data', (data) => {
          resolve(String(data))
        })
      },
    )

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

function getRedirectLocation(): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: port,
        method: 'GET',
      },
      (response) => {
        resolve(response.headers['location'])
      },
    )

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

function expectedIndex(): string {
  return fs
    .readFileSync(path.join(currentPath(), 'fake-output', 'index.html'))
    .toString()
}

function expectedOtherHtml(): string {
  return fs
    .readFileSync(path.join(currentPath(), 'fake-output', 'other.html'))
    .toString()
}

function expectedAsset(): string {
  return fs
    .readFileSync(
      path.join(currentPath(), 'fake-output', 'directory', 'asset.css'),
    )
    .toString()
}

function fakeOutputLocation(): string {
  return path.join(currentPath(), 'fake-output')
}

function currentPath(): string {
  return path.dirname(fileURLToPath(import.meta.url))
}
