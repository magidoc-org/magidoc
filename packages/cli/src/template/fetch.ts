import axios, { type AxiosError } from 'axios'
import fs, { type WriteStream } from 'fs-extra'
import type { Template } from '.'

export type FetchTemplateConfig = {
  template: Template
  version: string
  destination: string
}

const templateUrl = 'https://github.com/magidoc-org/magidoc/releases/download/<version>/starter-<name>.zip'

export default async function fetchTemplate(config: FetchTemplateConfig) {
  const targetUrl = templateUrl.replace('<version>', config.version).replace('<name>', config.template)

  await axios
    .request<{
      pipe: (stream: WriteStream) => void
    }>({
      method: 'get',
      url: targetUrl,
      responseType: 'stream',
    })
    .then(async (response) => {
      const writer = fs.createWriteStream(config.destination)

      return new Promise((resolve, reject) => {
        writer.on('error', (err) => {
          writer.close()
          reject(err)
        })

        writer.on('close', () => {
          resolve(true)
        })

        response.data.pipe(writer)
      })
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error(
            `Could not find template '${config.template}' with version '${config.version}'. \nSearched the following location: \n - ${targetUrl}`,
            error,
          )
        }
      }

      throw new Error(`Unable to fetch template at ${targetUrl}`, error)
    })
}
