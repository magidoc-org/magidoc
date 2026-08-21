import { yellow } from '../../commands/utils/outputColors'
import {
  getPackageManager,
  type PackageManager,
  type PackageManagerType,
  selectPackageManager,
} from '../../node/packageManager'
import type { Task } from '../runner'

type Ctx = {
  packageManager: PackageManager
}

type Config = {
  packageManager?: PackageManagerType
}

export function selectPackageManagerTask<T extends Ctx>(config: Config): Task<T> {
  return {
    title: 'Select Package Manager',
    executor: async (ctx, task) => {
      if (config.packageManager) {
        ctx.packageManager = getPackageManager(config.packageManager)
      } else {
        ctx.packageManager = await selectPackageManager()
      }

      let output = `Selected ${ctx.packageManager.type}`
      if (ctx.packageManager.type !== 'pnpm' && ctx.packageManager.type !== 'system-pnpm') {
        output += yellow(
          '\n⚠️ This package manager is not well supported yet.\n⚠️ It ignores the lockfile shipped with the template,\n⚠️ so transitive dependencies are resolved fresh and may break the build.',
        )
      }

      task.output(output)
    },
  }
}
