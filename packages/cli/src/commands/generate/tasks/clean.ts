import type { GenerationConfig } from '../config'
import { newTask, GenerateTask } from '../task'

export function clean(config: GenerationConfig): GenerateTask {
  return newTask({
    title: 'Clean',
    enabled: config.clean,
    executor: async (ctx) => {
      await ctx.tmpArchive.delete()
      await ctx.tmpDirectory.delete()
    },
  })
}
