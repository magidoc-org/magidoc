import http from 'http'
import type { AddressInfo } from 'net'
import sirv from 'sirv'
import { printError, printInfo, printLine, printWarning } from '../utils/log'
import { cyan, red, yellow } from '../utils/outputColors'

export type PreviewConfig = {
  websiteLocation: string
  port: number
  siteRoot?: string
}

export default function preview(config: PreviewConfig) {
  printWarning(
    `⚠️ ${yellow(
      'Preview command is not meant to be used for static file serving in production.',
    )}`,
  )

  const assets = sirv(config.websiteLocation, {
    maxAge: 0,
    immutable: true,
    dotfiles: true,
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
      logError(
        `Could not start preview server... port ${cyan(
          config.port,
        )} already in use.`,
      )
    } else {
      logError(`Could not preview start server... ${error.message}`)
    }
  })

  if (config.port) {
    startApp(server, config.port)
  } else {
    startApp(server, 4000)
  }
}

function logError(message: string) {
  printError(`${red('Error: ')} ${message}`)
}
function startApp(server: http.Server, port: number) {
  server.listen(port, 'localhost', () => {
    const address = server.address() as AddressInfo

    printLine()
    printInfo(`Server listening on ${cyan(`http://localhost:${address.port}`)}`)
  })
}
