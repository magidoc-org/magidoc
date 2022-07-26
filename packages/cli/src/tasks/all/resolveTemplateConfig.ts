import path from 'path'
import type { Variable } from '@magidoc/plugin-starter-variables'
import type { Task } from '../runner'
import { loadTemplateConfig } from '../../template/config'
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
  return {
    title: `Resolving template configuration`,
    executor: async (ctx, task) => {
      const configPath = templateConfigurationFile(ctx.tmpDirectory.path)
      const config = await loadTemplateConfig(configPath)

      let output = `Found ${config.SUPPORTED_OPTIONS.length} supported keys\n`
      output += `Target schema location: ${config.SCHEMA_TARGET_LOCATION}`

      task.output(output)

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
  }
}
