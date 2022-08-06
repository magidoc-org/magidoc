import net from 'net'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getPortAvailability,
  type PortUnavailable,
} from '../../../src/commands/utils/port'

const port = 3423
const host = 'localhost'

describe('checking if port is available', () => {
  describe('port is available', () => {
    it('returns true', async () => {
      const result = await getPortAvailability(host, port)
      expect(result).toEqual({
        available: true,
      })
    })
  })

  describe('port is unavailable', () => {
    let server: net.Server

    beforeEach(async () => {
      server = await createServer()
    })

    afterEach(
      () =>
        new Promise((resolve, reject) => {
          server.close((err) => (err ? reject(err) : resolve()))
        }),
    )

    it('returns false', async () => {
      const result = await getPortAvailability(host, port)
      expect(result.available).toBe(false)
      expect((result as PortUnavailable).code).toBe('EADDRINUSE')
    })
  })
})

function createServer(): Promise<net.Server> {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once('error', reject)
    server.once('listening', () => resolve(server))
    server.listen(port, host)
  })
}
