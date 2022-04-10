import type { FetchConfig } from './schema/fetch'

export type GenerationConfig = {
  /**
   * The configuration used for fetching the GraphQL Schema from the remote server
   */
  fetchConfig?: FetchConfig

  /**
   * The output target directory
   */
  output: string
}

export default function generate(config: GenerationConfig) {
  console.log(JSON.stringify(config))
}
