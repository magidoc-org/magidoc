import type { InitConfig } from '../config'
import { newTask, InitTask } from '../task'

export function installDependenciesTask(config: InitConfig): InitTask {
  return newTask({
    title: `Install dependencies`,
    executor: async (ctx) => {
      await ctx.runner.runInstall({
        cwd: config.destination,
      })
    },
  })
}
