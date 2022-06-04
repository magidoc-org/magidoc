import { fetchSchema } from '@magidoc/rollup-plugin-fetch-gql-schema'
import { parseSchema } from '@magidoc/rollup-plugin-parse-gql-schema'
import fs from 'fs/promises'
import { newTask, Task } from '..'
import type { IntrospectionConfiguration } from '../../config/types'
import type { ResolvedMagidocTemplateConfig } from './resolveTemplateConfig'

type Config = {
  introspection: IntrospectionConfiguration
}

type Ctx = {
  templateConfiguration: ResolvedMagidocTemplateConfig
}

export function loadGraphQLSchemaTask<T extends Ctx>(config: Config): Task<T> {
  return newTask({
    title: `Load GraphQL Schema`,
    executor: async (ctx) => {
      switch (config.introspection.type) {
        case 'url':
          await fetchSchema({
            url: config.introspection.url,
            method: config.introspection.method,
            query: config.introspection.query,
            headers: config.introspection.headers,
            target: ctx.templateConfiguration.schemaTargetLocation,
          })
          break
        case 'sdl':
          await parseSchema({
            paths: config.introspection.paths,
            target: ctx.templateConfiguration.schemaTargetLocation,
          })
          break
        case 'file':
          await fs.copyFile(
            config.introspection.location,
            ctx.templateConfiguration.schemaTargetLocation,
          )
          break
        case 'raw':
          await fs.writeFile(
            ctx.templateConfiguration.schemaTargetLocation,
            config.introspection.content,
          )
      }
    },
  })
}
