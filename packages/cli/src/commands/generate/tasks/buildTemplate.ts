import { newTask, GenerateTask } from '../task'

export function buildTemplateTask(): GenerateTask {
  return newTask({
    title: `Build template`,
    executor: async (ctx) => {
      await ctx.packageManager.buildProject({
        cwd: ctx.tmpDirectory.path,
      })
    },
  })
}
