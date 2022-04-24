import type { GenerationConfig } from '../config'
import { fetchSchema } from '@magidoc/rollup-plugin-fetch-gql-schema'
import { newTask, GenerateTask } from '../task'
import fs from 'fs/promises'

export function loadGraphQLSchemaTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Load GraphQL Schema`,
    executor: async (ctx) => {
      switch (config.introspection.type) {
        case 'url':
          await fetchSchema({
            url: config.introspection.url,
            method: config.introspection.method,
            headers: config.introspection.headers,
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
