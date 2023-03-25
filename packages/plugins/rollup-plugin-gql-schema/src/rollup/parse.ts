import type { Plugin } from 'rollup'
import { writeFileSync } from 'fs'
import { parseGraphqlSchema } from '../schema/parse'
import { convert, type OutputFormat } from '../schema/convert'

export type PluginOptions = {
  /**
   * The paths to the GraphQL SDL files. Glob syntax may be used.
   */
  paths: string[]

  /**
   * Indicates the target path for the JSON Schema resulting from the Query.
   *
   * @default src/_schema.json
   */
  target?: string

  /**
   * Wether the output format should be a GraphQL SDL file or an introspection JSON file.
   *
   * Defaults to introspection JSON.
   */
  format?: OutputFormat
}

export async function parseSchema(options: PluginOptions) {
  const schema = await parseGraphqlSchema({
    globPaths: options.paths,
  })

  const format: OutputFormat = options.format ?? 'introspection'
  const extension = format === 'sdl' ? 'graphqls' : 'json'
  const output = options.target || `src/_schema.${extension}`

  writeFileSync(output, convert(schema, format), {
    encoding: 'utf-8',
    flag: 'w',
  })
}

export default function parseGraphQLSchema(options: PluginOptions): Plugin {
  return {
    name: 'parse-graphql-schema',
    buildStart: async function () {
      await parseSchema(options)
    },
  }
}
