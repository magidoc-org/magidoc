import type { PreviewConfig } from './config'
import http from 'http'
import type { AddressInfo } from 'net'
import sirv from 'sirv'
import { cyan, red, yellow } from '../utils/outputColors'

const DEFAULT_PORT = 4000

export default function preview(config: PreviewConfig) {
  console.log(
    `⚠️ ${yellow(
      'Preview command is not meant to be used for static file serving in production.',
    )}`,
  )

  const assets = sirv(config.websiteLocation, {
    maxAge: 0, // 0
    immutable: true,
  })

  const server = http.createServer((req, res) => {
    if (!config.siteRoot || req.url?.startsWith(config.siteRoot)) {
      req.url = req.url?.replace(config.siteRoot || '', '')

      assets(req, res, () => {
        res.end()
      })
    } else {
      res.statusCode = 302
      res.setHeader('Location', config.siteRoot)
      res.end()
    }
  })

  server.on('error', (error) => {
    if (error.message.includes('EADDRINUSE')) {
      if (config.port) {
        logError(
          `Could not start server... port ${cyan(config.port)} already in use.`,
        )
      } else {
        // Use a random port since the default hardcoded port isn't free
        console.log()
        console.log(
          `Port ${cyan(
            DEFAULT_PORT,
          )} is occupied. Falling back to random port.`,
        )
        server.close()
        server.listen(0, 'localhost')
      }
    } else {
      logError(`Could not start server... ${error.message}`)
    }
  })

  if (config.port) {
    startApp(server, config.port)
  } else {
    startApp(server, 4000)
  }
}

function logError(message: string) {
  console.log(`${red('Error: ')} ${message}`)
}
function startApp(server: http.Server, port: number) {
  server.listen(port, 'localhost', () => {
    const address = server.address() as AddressInfo
    console.log()

    console.log(
      `Server listening on ${cyan(`http://localhost:${address.port}`)}`,
    )
  })
}
