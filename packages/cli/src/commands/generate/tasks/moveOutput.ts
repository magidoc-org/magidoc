import { GenerationConfig, newTask, Task } from '..'
import { moveOutputBuild } from '../../../template/output'
import path from 'path'

export function moveOutputTask(config: GenerationConfig): Task {
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
