import { newTask, GenerateTask } from '../task'
import { selectPackageManager } from '../../../node/packageManager'

export function selectPackageManagerTask(): GenerateTask {
  return newTask({
    title: 'Select Package Manager',
    executor: async (ctx, task) => {
      ctx.packageManager = await selectPackageManager()
      task.output = `Selected ${ctx.packageManager.type}`
    },
  })
}
