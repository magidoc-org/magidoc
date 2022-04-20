import type { GenerationConfig } from '../config'
import { newTask, Task } from '../task'

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
