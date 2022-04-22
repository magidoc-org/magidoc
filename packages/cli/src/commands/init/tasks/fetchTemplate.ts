import fetchTemplate from '../../../template/fetch'
import type { InitConfig } from '../config'
import type { InitTask } from '../task'
import { newTask } from '../task'

export function fetchTemplateTask(config: InitConfig): InitTask {
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
