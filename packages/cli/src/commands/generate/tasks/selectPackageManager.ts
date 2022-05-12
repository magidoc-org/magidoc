import { newTask, GenerateTask } from '../task'
import {
  getPackageManager,
  selectPackageManager,
} from '../../../node/packageManager'
import type { GenerationConfig } from '../config'

export function selectPackageManagerTask(
  config: GenerationConfig,
): GenerateTask {
  return newTask({
    title: 'Select Package Manager',
    executor: async (ctx, task) => {
      if (config.packageManager) {
        ctx.packageManager = getPackageManager(config.packageManager)
      } else {
        ctx.packageManager = await selectPackageManager()
      }

      task.output = `Selected ${ctx.packageManager.type}`
    },
  })
}
