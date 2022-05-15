import { newTask, GenerateTask } from '../task'
import path from 'path'
import { parseTemplateConfig } from '../../../template/config'

export function templateConfigurationFile(templateDirectory: string): string {
  return path.join(templateDirectory, 'magidoc.config.js')
}

export function loadTemplateConfigurationTask(): GenerateTask {
  return newTask({
    title: `Load template configuration`,
    executor: async (ctx, task) => {
      const configPath = templateConfigurationFile(ctx.tmpDirectory.path)
      const rawConfig = (await import(configPath)) as unknown

      const config = parseTemplateConfig(rawConfig)

      let output = `Found ${config.SUPPORTED_OPTIONS.length} supported keys\n`
      output += `Target schema location: ${config.SCHEMA_TARGET_LOCATION}`

      task.output = output

      ctx.templateConfiguration = {
        supportedOptions: config.SUPPORTED_OPTIONS,
        schemaTargetLocation: config.SCHEMA_TARGET_LOCATION,
        staticAssetsLocation: config.STATIC_ASSETS_LOCATION,
      }
    },
  })
}
