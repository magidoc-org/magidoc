import { newTask, Task } from '../task'
import fetchTemplate from '../../../template/fetch'
import type { GenerationConfig } from '../config'

export function fetchTemplateTask(config: GenerationConfig): Task {
  return newTask({
    title: `Fetch template ${config.template}@${config.templateVersion}`,
    executor: async (ctx, task) => {
      if (await ctx.tmpArchive.exists()) {
        return task.skip('Template already downloaded')
      }

      await fetchTemplate({
        template: config.template,
        version: config.templateVersion,
        destination: ctx.tmpArchive.path,
      })
    },
  })
}
