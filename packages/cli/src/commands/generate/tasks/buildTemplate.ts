import { newTask, Task } from '..'

export function buildTemplateTask(): Task {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.npmRunner.buildProject({
        cwd: ctx.tmpDirectory.path,
      })
    },
  })
}
