import type { PackageManager } from '../../node/packageManager'
import type { TmpLocation } from '../../template/tmp'
import type { Task } from '../runner'

type Ctx = {
  tmpDirectory: TmpLocation
  packageManager: PackageManager
}

export function buildTemplateTask<T extends Ctx>(): Task<T> {
  return {
    title: 'Build template',
    executor: async (ctx) => {
      await ctx.packageManager.buildProject({
        cwd: ctx.tmpDirectory.path,
      })
    },
  }
}
