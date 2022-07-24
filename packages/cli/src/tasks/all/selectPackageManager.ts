import type { Task } from '..'
import {
  getPackageManager,
  PackageManager,
  PackageManagerType,
  selectPackageManager,
} from '../../node/packageManager'

type Ctx = {
  packageManager: PackageManager
}

type Config = {
  packageManager?: PackageManagerType
}

export function selectPackageManagerTask<T extends Ctx>(
  config: Config,
): Task<T> {
  return {
    title: 'Select Package Manager',
    executor: async (ctx, task) => {
      if (config.packageManager) {
        ctx.packageManager = getPackageManager(config.packageManager)
      } else {
        ctx.packageManager = await selectPackageManager()
      }

      task.output(`Selected ${ctx.packageManager.type}`)
    },
  }
}
