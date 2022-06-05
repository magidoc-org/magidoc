import path from 'path'
import { newTask, Task } from '..'
import type { WebsiteConfiguration } from '../../config/types'
import { moveOutputBuild } from '../../template/output'
import type { TmpLocation } from '../../template/tmp'

type Ctx = {
  tmpDirectory: TmpLocation
}

type Config = {
  website: WebsiteConfiguration
}

export function moveOutputTask<T extends Ctx>(config: Config): Task<T> {
  return newTask({
    title: `Move output`,
    executor: async (ctx, task) => {
      await moveOutputBuild(
        path.join(ctx.tmpDirectory.path, 'build'),
        config.website.output,
      )
      task.output = `Moved output at ${config.website.output}`
    },
  })
}
