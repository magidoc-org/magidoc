import type { Method } from '@magidoc/rollup-plugin-fetch-gql-schema'
import type { Template } from '../../template'

export type GenerationConfig = {
  template: Template
  templateVersion: string
  fetchConfig: FetchConfig
  output: string
  clean: boolean
  options: Record<string, string | boolean | number>
}

export type FetchConfig = {
  url: string
  method: Method
  headers: Record<string, string>
}
