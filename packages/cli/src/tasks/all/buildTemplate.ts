import { newTask, Task } from '..'
import type { PackageManager } from '../../node/packageManager'
import type { TmpLocation } from '../../template/tmp'

type Ctx = {
  tmpDirectory: TmpLocation
  packageManager: PackageManager
}

export function buildTemplateTask<T extends Ctx>(): Task<T> {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.packageManager.buildProject({
        cwd: ctx.tmpDirectory.path,
      })
    },
  })
}
