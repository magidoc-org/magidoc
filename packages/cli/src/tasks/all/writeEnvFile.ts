import { toVariablesFile } from '@magidoc/plugin-starter-variables'
import { writeFile } from 'fs/promises'
import type { Task } from '../runner'
import type { WebsiteConfiguration } from '../../config/types'
import type { ResolvedMagidocTemplateConfig } from './resolveTemplateConfig'

type Config = {
  website: Pick<WebsiteConfiguration, 'options'>
}

type Ctx = {
  templateConfiguration: Pick<
    ResolvedMagidocTemplateConfig,
    'envFileLocation' | 'supportedOptions'
  >
}

export function writeEnvFileTask<T extends Ctx>(config: Config): Task<T> {
  return {
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
  }
}
