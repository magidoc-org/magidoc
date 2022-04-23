import { newTask, GenerateTask } from '../task'
import path from 'path'
import type { Variable } from '@magidoc/plugin-starter-variables'

export function templateConfigurationFile(templateDirectory: string): string {
  return path.join(templateDirectory, 'magidoc.config.js')
}

export function loadTemplateConfigurationTask(): GenerateTask {
  return newTask({
    title: `Load template configuration`,
    executor: async (ctx, task) => {
      const configPath = templateConfigurationFile(ctx.tmpDirectory.path)

      const config = (await import(configPath)) as {
        SUPPORTED_OPTIONS?: Variable<unknown>[]
        SCHEMA_TARGET_LOCATION?: string
      }

      const supportedOptions = config.SUPPORTED_OPTIONS || []
      const schemaTargetLocation = path.join(
        ctx.tmpDirectory.path,
        config.SCHEMA_TARGET_LOCATION || '',
      )

      task.output = ''
      task.output += `Found ${supportedOptions.length} supported keys\n`
      task.output += `Target schema location: ${schemaTargetLocation}`

      ctx.templateConfiguration = {
        supportedOptions,
        schemaTargetLocation,
      }
    },
  })
}
