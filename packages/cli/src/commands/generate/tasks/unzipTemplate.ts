import { newTask, GenerateTask } from '../task'
import { unzipTemplate } from '../../../template/unzip'
import { isTemplate } from '../../../template'
import type { GenerationConfig } from '../config'

export function unzipTemplateTask(config: GenerationConfig): GenerateTask {
  return newTask({
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
  })
}
