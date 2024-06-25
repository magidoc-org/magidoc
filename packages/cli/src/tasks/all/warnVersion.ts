import { yellow } from '../../commands/utils/outputColors'
import type { WebsiteConfiguration } from '../../config/types'
import { isTemplate } from '../../template'
import { getVersion } from '../../version'
import type { Task } from '../runner'

type Config = {
  website: Pick<WebsiteConfiguration, 'template' | 'templateVersion'>
}

export function warnVersionTask<T>(config: Config): Task<T> {
  return {
    title: 'Template version warning',
    enabled: isTemplate(config.website.template) && config.website.templateVersion !== getVersion(),
    executor: (_, task) => {
      task.output(
        yellow(
          '⚠️ Template version has been set to a different version that the current CLI version.\n⚠️ This may result in unexpected results.',
        ),
      )
    },
  }
}
