import { GenerationConfig, newTask, Task } from '..'
import fetchTemplate from '../../../template/fetch'

export function fetchTemplateTask(config: GenerationConfig): Task {
  return newTask({
    title: `Fetch template ${config.template}@${config.templateVersion}`,
    executor: async (ctx, task) => {
      if(await ctx.tmpArchive.exists()) {
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
