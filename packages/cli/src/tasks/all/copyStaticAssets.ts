import { newTask, Task } from '..'
import type { WebsiteConfiguration } from '../../config/types'
import { copyStaticAssets } from '../../template/assets'
import type { ResolvedMagidocTemplateConfig } from './resolveTemplateConfig'

type Config = {
  website: WebsiteConfiguration
}

type Ctx = {
  templateConfiguration: ResolvedMagidocTemplateConfig
}

export function copyStaticAssetsTask<T extends Ctx>(config: Config): Task<T> {
  return newTask({
    title: `Copy static assets`,
    enabled: !!config.website.staticAssets,
    executor: async (ctx) => {
      if (config.website.staticAssets) {
        await copyStaticAssets(
          config.website.staticAssets,
          ctx.templateConfiguration.staticAssetsLocation,
        )
      }
    },
  })
}
