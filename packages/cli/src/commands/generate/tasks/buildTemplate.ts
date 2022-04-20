import { newTask, Task } from '../task'

export function buildTemplateTask(): Task {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.npmRunner.buildProject({
        cwd: ctx.tmpDirectory.path,
        env: {}, // TODO
      })
    },
  })
}
