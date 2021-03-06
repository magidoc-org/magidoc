import { newTask, Task } from '..'
import {
  getPackageManager,
  isPackageManagerAvailable,
  PackageManager,
  PackageManagerType,
} from '../../node/packageManager'

export type Config = {
  packageManager: PackageManagerType
}

export type Ctx = {
  packageManager: PackageManager
}

export function verifyPackageManagerAvailableTask<T extends Ctx>(
  config: Config,
): Task<T> {
  return newTask({
    title: 'Verify Package Manager is available',
    executor: async (ctx) => {
      if (await isPackageManagerAvailable(config.packageManager)) {
        ctx.packageManager = getPackageManager(config.packageManager)
      } else {
        throw new Error(
          `Package Manager '${config.packageManager}' is not installed. Please install it or select another runner to continue.`,
        )
      }
    },
  })
}
