import type { InitConfig } from '../config'
import { InitTask, newTask } from '../task'
import { getRunner, isRunnerAvailable } from '../../../npm/runner'

export function verifyNpmRunnerAvailableTask(config: InitConfig): InitTask {
  return newTask({
    title: 'Verify NPM Runner is available',
    executor: async (ctx) => {
      if (await isRunnerAvailable(config.runnerType)) {
        ctx.runner = getRunner(config.runnerType)
      } else {
        throw new Error(
          `NPM Runner '${config.runnerType}' is not installed. Please install it or select another runner to continue.`,
        )
      }
    },
  })
}
