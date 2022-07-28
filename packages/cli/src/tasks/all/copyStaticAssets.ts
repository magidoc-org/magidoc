import { copyStaticAssets } from '../../template/assets'
import type { Task } from '../runner'
import type { WebsiteConfiguration } from '../../config/types'
import type { ResolvedMagidocTemplateConfig } from './resolveTemplateConfig'

type Config = {
  website: Pick<WebsiteConfiguration, 'staticAssets'>
}

type Ctx = {
  templateConfiguration: ResolvedMagidocTemplateConfig
}

export function copyStaticAssetsTask<T extends Ctx>(config: Config): Task<T> {
  return {
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
  }
}
