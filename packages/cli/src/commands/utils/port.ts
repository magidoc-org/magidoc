import net from 'net'

export type PortAvailable = {
  available: true
}

export type PortUnavailable = {
  available: false
  reason: string
  code: string | undefined
}

export type PortAvailability = PortAvailable | PortUnavailable

export function getPortAvailability(
  host: string,
  port: number,
): Promise<PortAvailability> {
  return new Promise((resolves) => {
    const server = net.createServer()
    const onError = (err: Error & { code: string | undefined }) => {
      server.close()
      resolves({
        available: false,
        reason: err.message,
        code: err.code,
      })
    }
    server.once('error', onError)
    server.once('timeout', onError)
    server.once('listening', () => {
      server.close()
      resolves({
        available: true,
      })
    })

    server.listen(port, host)
  })
}
