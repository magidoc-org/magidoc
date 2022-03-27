import { IntrospectionQuery } from 'graphql'
import type { Plugin, NormalizedInputOptions, PluginContext } from 'rollup'
import queryGraphQLSchema from './schema/fetch'

export type PluginOptions = {
  /**
   * The URL the of the GraphQL API from which to fetch the GraphQL Schema using the introspection query.
   */
  url: string

  /**
   * A record of headers to pass inside the GraphQL Request performed to the server. Mostly useful when Authorization is required.
   *
   * @default {}
   */
  headers?: Record<string, string>

  /**
   * Indicates the target path for the JSON Schema resulting from the Query.
   *
   * @default _schema.json
   */
  target?: string
}

export default function fetchGraphQLSchema(options: PluginOptions): Plugin {
  async function setSchema(this: PluginContext) {
    this.emitFile({
      type: 'asset',
      fileName: options.target || '_schema.json',
      source: JSON.stringify(
        await queryGraphQLSchema(options.url, options.headers),
      ),
    })
  }

  return {
    name: 'fetch-graphql-schema',
    buildStart: async function () {
      await setSchema.bind(this)()
    },
  }
}
