import { GenerationConfig, newTask, Task } from '..'

export function clean(config: GenerationConfig): Task {
  return newTask({
    title: 'Clean',
    enabled: config.clean,
    executor: async (ctx) => {
      await ctx.tmpArchive.delete()
      await ctx.tmpDirectory.delete()
    },
  })
}
