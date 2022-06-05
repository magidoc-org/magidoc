import type { WebsiteConfiguration } from '../../config/types'
import { newTask, Task } from '..'
import { getVersion } from '../../version'
import { isTemplate } from '../../template'

type Config = {
  website: WebsiteConfiguration
}

export function warnVersionTask<T>(config: Config): Task<T> {
  return newTask({
    title: `Template version warning`,
    enabled:
      config.website.templateVersion !== getVersion() &&
      isTemplate(config.website.template),
    executor: (_, task) => {
      task.output =
        '⚠️ Template version has been set to a different version that the current CLI version.\n⚠️ This may result in unexpected results.'
    },
  })
}
