import { GenerationConfig, newTask, Task } from '..'
import fetchTemplate from '../../../template/fetch'

export function fetchTemplateTask(config: GenerationConfig): Task {
  return newTask({
    title: `Fetch template ${config.template}@${config.templateVersion}`,
    skip: async (ctx) => {
      if (await ctx.tmpArchive.exists()) {
        return 'Template already downloaded'
      }

      return false
    },
    executor: async (ctx) => {
      await fetchTemplate({
        template: config.template,
        version: config.templateVersion,
        destination: ctx.tmpArchive.path,
      })
    },
  })
}
