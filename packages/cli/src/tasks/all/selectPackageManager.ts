import { createPackageManager, type PackageManager } from '../../node/packageManager'
import type { Task } from '../runner'

type Ctx = {
  packageManager: PackageManager
}

export function selectPackageManagerTask<T extends Ctx>(): Task<T> {
  return {
    title: 'Resolve package manager',
    executor: async (ctx, task) => {
      ctx.packageManager = createPackageManager()
      task.output('Using the pnpm bundled with Magidoc')
    },
  }
}
