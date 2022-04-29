import type { Plugin } from 'rollup'
import { writeFileSync } from 'fs'
import { parseGraphqlSchema } from './schema/parse'

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
}

export async function parseSchema(options: PluginOptions) {
  const schema = await parseGraphqlSchema({
    globPaths: options.paths,
  })

  const output = options.target || 'src/_schema.json'

  writeFileSync(output, JSON.stringify(schema), {
    encoding: 'utf-8',
    flag: 'w',
  })
}

export default function fetchGraphQLSchema(options: PluginOptions): Plugin {
  return {
    name: 'parse-graphql-schema',
    buildStart: async function () {
      await parseSchema(options)
    },
  }
}
