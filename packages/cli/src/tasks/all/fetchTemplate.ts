import type { Task } from '../runner'
import type { TmpLocation } from '../../template/tmp'
import { isTemplate } from '../../template'
import fetchTemplate from '../../template/fetch'
import type { WebsiteConfiguration } from '../../config/types'

type Config = {
  website: Pick<WebsiteConfiguration, 'template' | 'templateVersion'>
}

type Ctx = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
}

export function fetchTemplateTask<T extends Ctx>(config: Config): Task<T> {
  return {
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
  }
}
