import { newTask, Task } from '../task'

export function installDependenciesTask(): Task {
  return newTask({
    title: `Install dependencies`,
    executor: async (ctx) => {
      await ctx.npmRunner.runInstall({
        cwd: ctx.tmpDirectory.path,
      })
    },
  })
}
