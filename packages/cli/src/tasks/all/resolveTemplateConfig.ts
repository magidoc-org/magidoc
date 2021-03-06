import path from 'path'
import { pathToFileURL } from 'url'
import type { Variable } from '@magidoc/plugin-starter-variables'
import { newTask, Task } from '..'
import { parseTemplateConfig } from '../../template/config'
import type { TmpLocation } from '../../template/tmp'

type Ctx = {
  tmpDirectory: TmpLocation
  templateConfiguration: ResolvedMagidocTemplateConfig
}

export type ResolvedMagidocTemplateConfig = {
  supportedOptions: ReadonlyArray<Variable<unknown>>
  schemaTargetLocation: string
  staticAssetsLocation: string
  envFileLocation: string
}

export function templateConfigurationFile(templateDirectory: string): string {
  return path.join(templateDirectory, 'magidoc.config.js')
}

export function resolveTemplateConfigurationTask<T extends Ctx>(): Task<T> {
  return newTask({
    title: `Resolving template configuration`,
    executor: async (ctx, task) => {
      const configPath = templateConfigurationFile(ctx.tmpDirectory.path)
      const rawConfig = (await import(
        pathToFileURL(configPath).toString()
      )) as unknown

      const config = parseTemplateConfig(rawConfig)

      let output = `Found ${config.SUPPORTED_OPTIONS.length} supported keys\n`
      output += `Target schema location: ${config.SCHEMA_TARGET_LOCATION}`

      task.output = output

      ctx.templateConfiguration = {
        supportedOptions: config.SUPPORTED_OPTIONS,
        schemaTargetLocation: path.join(
          ctx.tmpDirectory.path,
          config.SCHEMA_TARGET_LOCATION,
        ),
        staticAssetsLocation: path.join(
          ctx.tmpDirectory.path,
          config.STATIC_ASSETS_LOCATION,
        ),
        envFileLocation: path.join(
          ctx.tmpDirectory.path,
          config.ENV_FILE_LOCATION,
        ),
      }
    },
  })
}
