import { newTask, Task } from '..'
import type { WebsiteConfiguration } from '../../config/types'
import { isTemplate } from '../../template'
import type { TmpLocation } from '../../template/tmp'

type Config = {
  clean: boolean
  website: WebsiteConfiguration
}

type Ctx = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
}

export function cleanTask<T extends Ctx>(config: Config): Task<T> {
  return newTask({
    title: 'Clean',
    enabled: config.clean && isTemplate(config.website.template),
    executor: async (ctx) => {
      await ctx.tmpArchive.delete()
      await ctx.tmpDirectory.delete()
    },
  })
}
