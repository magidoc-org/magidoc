import type { Plugin, PluginContext } from 'rollup'
import queryGraphQLSchema, { Method } from './schema/query.js'
import { writeFileSync } from 'fs'

export type { Method }

export type PluginOptions = {
  /**
   * The URL the of the GraphQL API from which to fetch the GraphQL Schema using the introspection query.
   */
  url: string

  /**
   * The HTTP method used to call the GraphQL API.
   *
   * @default 'POST'
   */
  method?: Method

  /**
   * A record of headers to pass inside the GraphQL Request performed to the server. Mostly useful when Authorization is required.
   *
   * @default {"Content-Type": "application/json"}
   */
  headers?: Record<string, string>

  /**
   * Indicates the target path for the JSON Schema resulting from the Query.
   *
   * @default src/_schema.json
   */
  target?: string
}

export default function fetchGraphQLSchema(options: PluginOptions): Plugin {
  async function setSchema(this: PluginContext) {
    const schema = await queryGraphQLSchema(options.url, {
      method: options.method,
      headers: options.headers,
    })

    const output = options.target || 'src/_schema.json'

    writeFileSync(output, JSON.stringify(schema))
  }

  return {
    name: 'fetch-graphql-schema',

    buildStart: async function () {
      await setSchema.bind(this)()
    },
  }
}
