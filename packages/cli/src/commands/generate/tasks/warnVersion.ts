import { newTask, Task } from '../task'
import type { GenerationConfig } from '../config'
import { getVersion } from '../../../version'

export function warnVersion(config: GenerationConfig): Task {
  return newTask({
    title: `Template version warning`,
    enabled: config.templateVersion !== getVersion(),
    executor: (_, task) => {
      task.output =
        '⚠️ Template version has been set to a different version that the current CLI version.\n⚠️ This may result in unexpected results.'
    },
  })
}
