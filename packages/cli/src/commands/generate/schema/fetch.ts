import fetchGqlSchema from '@magidoc/rollup-plugin-fetch-gql-schema'
import type { Method as PluginMethod } from '@magidoc/rollup-plugin-fetch-gql-schema'

export type Method = PluginMethod

export type Header = {
  name: string
  value: string
}

export type FetchConfig = {
  /**
   * The URL of the target server
   */
  url: string
  /**
   * The HTTP method to to fetch the schema
   */
  method: Method
  /**
   * The headers to pass to the query
   */
  headers: Header[]
}

export default function fetchSchema(config: FetchConfig) {
  const headers: Record<string, string> = {}
  config.headers.forEach(({ name, value }) => (headers[name] = value))

  fetchGqlSchema({
    url: config.url,
    method: config.method,
    headers: headers,
    target: 'TODO',
  })
}
