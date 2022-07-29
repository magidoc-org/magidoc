import type { Task } from '../runner'
import type { WebsiteConfiguration } from '../../config/types'
import { isTemplate } from '../../template'
import type { TmpLocation } from '../../template/tmp'

type Config = {
  clean: boolean
  website: Pick<WebsiteConfiguration, 'template'>
}

type Ctx = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
}

export function cleanTask<T extends Ctx>(config: Config): Task<T> {
  return {
    title: 'Clean',
    enabled: config.clean && isTemplate(config.website.template),
    executor: async (ctx) => {
      await ctx.tmpArchive.delete()
      await ctx.tmpDirectory.delete()
    },
  }
}
