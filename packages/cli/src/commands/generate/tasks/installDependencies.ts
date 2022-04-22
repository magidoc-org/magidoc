import { newTask, GenerateTask } from '../task'

export function installDependenciesTask(): GenerateTask {
  return newTask({
    title: `Install dependencies`,
    executor: async (ctx) => {
      await ctx.packageManager.runInstall({
        cwd: ctx.tmpDirectory.path,
      })
    },
  })
}
