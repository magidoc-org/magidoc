import { newTask, GenerateTask } from '../task'
import { moveOutputBuild } from '../../../template/output'
import path from 'path'
import type { GenerationConfig } from '../config'

export function moveOutputTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Move output`,
    executor: async (ctx, task) => {
      await moveOutputBuild(
        path.join(ctx.tmpDirectory.path, 'build'),
        config.output,
      )
      task.output = `Moved output at ${config.output}`
    },
  })
}
