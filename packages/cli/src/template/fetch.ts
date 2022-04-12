import fs, { type WriteStream } from 'fs'
import axios, { AxiosError } from 'axios'
import type { Template } from '.'

export type FetchTemplateConfig = {
  template: Template
  version: string
  destination: string
}

const templateUrl =
  'https://github.com/magidoc-org/magidoc/releases/download/<version>/starter-<name>.zip'

export default async function fetchTemplate(config: FetchTemplateConfig) {
  const targetUrl = templateUrl
    .replace('<version>', config.version)
    .replace('<name>', config.template)

  return await axios
    .request<{
      pipe: (stream: WriteStream) => Promise<unknown>
    }>({
      method: 'get',
      url: targetUrl,
      responseType: 'stream',
    })
    .then((response) =>
      response.data.pipe(fs.createWriteStream(config.destination)),
    )
    .catch((error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error(
            `Could not find template '${config.template}' with version '${config.version}'. \nSearched the following location: \n - ${targetUrl}`,
          )
        }
      }

      throw new Error(
        `Unable to fetch template at ${targetUrl}. Cause: ${error.message}`,
      )
    })
}
