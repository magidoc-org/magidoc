import { newTask, Task } from '..'
import { unzipTemplate } from '../../../template/unzip'

export function unzipTemplateTask(): Task {
  return newTask({
    title: `Unzip template`,
    skip: async (ctx) => {
      if (await ctx.tmpDirectory.exists()) {
        return 'Template already unzipped'
      }

      return false
    },
    executor: async (ctx) => {
      await unzipTemplate({
        zipLocation: ctx.tmpArchive.path,
        destination: ctx.tmpDirectory.path,
      })
    },
  })
}
