import type { GenerationConfig } from '../config'
import { fetchSchema } from '@magidoc/rollup-plugin-fetch-gql-schema'
import { newTask, GenerateTask } from '../task'

export function loadGraphQLSchemaTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Load GraphQL Schema`,
    executor: async (ctx) => {
      await fetchSchema({
        url: config.fetchConfig.url,
        method: config.fetchConfig.method,
        headers: config.fetchConfig.headers,
        target: ctx.templateConfiguration.schemaTargetLocation,
      })
    },
  })
}
