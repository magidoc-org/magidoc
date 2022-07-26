import type { Task } from '../runner'
import type { PackageManager } from '../../node/packageManager'
import type { TmpLocation } from '../../template/tmp'

type Ctx = {
  tmpDirectory: TmpLocation
  packageManager: PackageManager
}

export function installDependenciesTask<T extends Ctx>(): Task<T> {
  return {
    title: `Install dependencies`,
    executor: async (ctx) => {
      await ctx.packageManager.runInstall({
        cwd: ctx.tmpDirectory.path,
      })
    },
  }
}
