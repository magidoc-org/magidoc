import type { PreviewConfig } from './config'
import http from 'http'
import type { AddressInfo } from 'net'
import chalk from 'chalk'
import sirv from 'sirv'
export default function preview(config: PreviewConfig) {
  const assets = sirv(config.websiteLocation, {
    maxAge: 31536000, // 1Y
    immutable: true,
  })

  const server = http.createServer((req, res) => {
    assets(req, res, () => {
      res.end()
    })
  })

  const port = config.port || 0
  server.listen(port, 'localhost', () => {
    const address = server.address() as AddressInfo
    const host = address.address === '127.0.0.1' ? 'localhost' : address.address

    console.log(
      `⚠️ ${chalk.yellow(
        'Preview command is not meant to be used for static file serving in production.',
      )}`,
    )
    console.log()

    console.log(
      `Server listening on ${chalk.cyan(`http://${host}:${address.port}`)}`,
    )
  })
}
