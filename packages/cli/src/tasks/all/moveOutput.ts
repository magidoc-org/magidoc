import path from 'path'
import type { Task } from '../runner'
import type { WebsiteConfiguration } from '../../config/types'
import { moveOutputBuild } from '../../template/output'
import type { TmpLocation } from '../../template/tmp'

type Ctx = {
  tmpDirectory: TmpLocation
}

type Config = {
  website: Pick<WebsiteConfiguration, 'output'>
}

export function moveOutputTask<T extends Ctx>(config: Config): Task<T> {
  return {
    title: `Move output`,
    executor: async (ctx, task) => {
      await moveOutputBuild(
        path.join(ctx.tmpDirectory.path, 'build'),
        config.website.output,
      )
      task.output(`Moved output at ${config.website.output}`)
    },
  }
}
