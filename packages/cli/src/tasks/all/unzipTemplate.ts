import type { Task } from '../runner'
import { isTemplate, Template } from '../../template'
import type { TmpLocation } from '../../template/tmp'
import { unzipTemplate } from '../../template/unzip'

type Config = {
  website: {
    template: Template | string
  }
}

type Ctx = {
  tmpDirectory: TmpLocation
  tmpArchive: TmpLocation
}

export function unzipTemplateTask<T extends Ctx>(config: Config): Task<T> {
  return {
    title: `Unzip template`,
    enabled: isTemplate(config.website.template),
    executor: async (ctx, task) => {
      if (await ctx.tmpDirectory.exists()) {
        return task.skip('Template already unzipped')
      }

      await unzipTemplate({
        zipLocation: ctx.tmpArchive.path,
        destination: ctx.tmpDirectory.path,
      })

      // Cleanup the zip archive, we don't need it anymore.
      await ctx.tmpArchive.delete()
    },
  }
}
