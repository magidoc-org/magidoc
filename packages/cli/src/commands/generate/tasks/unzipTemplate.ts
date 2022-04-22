import { newTask, GenerateTask } from '../task'
import { unzipTemplate } from '../../../template/unzip'

export function unzipTemplateTask(): GenerateTask {
  return newTask({
    title: `Unzip template`,
    executor: async (ctx, task) => {
      if (await ctx.tmpDirectory.exists()) {
        return task.skip('Template already unzipped')
      }

      await unzipTemplate({
        zipLocation: ctx.tmpArchive.path,
        destination: ctx.tmpDirectory.path,
      })
    },
  })
}
