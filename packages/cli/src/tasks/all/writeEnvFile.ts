import { toVariablesFile } from '@magidoc/plugin-starter-variables'
import { writeFile } from 'fs/promises'
import { newTask, Task } from '..'
import type { WebsiteConfiguration } from '../../config/types'
import type { ResolvedMagidocTemplateConfig } from './resolveTemplateConfig'

type Config = {
  website: WebsiteConfiguration
}

type Ctx = {
  templateConfiguration: ResolvedMagidocTemplateConfig
}

export function writeEnvFile<T extends Ctx>(config: Config): Task<T> {
  return newTask({
    title: `Write variables file`,
    executor: async (ctx) => {
      await writeFile(
        ctx.templateConfiguration.envFileLocation,
        toVariablesFile(
          config.website.options,
          ctx.templateConfiguration.supportedOptions,
        ),
      )
    },
  })
}
