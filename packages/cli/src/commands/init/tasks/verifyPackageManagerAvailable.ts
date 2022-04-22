import type { InitConfig } from '../config'
import { InitTask, newTask } from '../task'
import {
  getPackageManager,
  isPackageManagerAvailable,
} from '../../../node/packageManager'

export function verifyPackageManagerIsAvailableTask(
  config: InitConfig,
): InitTask {
  return newTask({
    title: 'Verify Package Manager is available',
    executor: async (ctx) => {
      if (await isPackageManagerAvailable(config.packageManagerType)) {
        ctx.runner = getPackageManager(config.packageManagerType)
      } else {
        throw new Error(
          `Package Manager '${config.packageManagerType}' is not installed. Please install it or select another runner to continue.`,
        )
      }
    },
  })
}
