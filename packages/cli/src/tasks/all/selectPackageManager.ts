import type { Task } from '../runner'
import {
  getPackageManager,
  type PackageManager,
  type PackageManagerType,
  selectPackageManager,
} from '../../node/packageManager'
import { yellow } from '../../commands/utils/outputColors'

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

      let output = `Selected ${ctx.packageManager.type}`
      if (ctx.packageManager.type !== 'pnpm') {
        output += yellow(
          '\n⚠️ This package manager is not well supported yet.\n⚠️ It is recommended to install pnpm instead.',
        )
      }

      task.output(output)
    },
  }
}
