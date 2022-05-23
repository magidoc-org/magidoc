import { newTask, GenerateTask } from '../task'
import fetchTemplate from '../../../template/fetch'
import type { GenerationConfig } from '../config'
import { isTemplate } from '../../../template'

export function fetchTemplateTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Fetch template ${config.website.template}@${config.website.templateVersion}`,
    enabled: isTemplate(config.website.template),
    executor: async (ctx, task) => {
      if (await ctx.tmpArchive.exists()) {
        return task.skip('Template already downloaded.')
      }

      if (await ctx.tmpDirectory.exists()) {
        return task.skip('Template already unzipped.')
      }

      if (isTemplate(config.website.template)) {
        await fetchTemplate({
          template: config.website.template,
          version: config.website.templateVersion,
          destination: ctx.tmpArchive.path,
        })
      }
    },
  })
}
