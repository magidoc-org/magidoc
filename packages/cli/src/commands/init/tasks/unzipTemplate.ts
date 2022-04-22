import { InitTask, newTask } from '../task'
import { unzipTemplate } from '../../../template/unzip'
import type { InitConfig } from '../config'

export function unzipTemplateTask(config: InitConfig): InitTask {
  return newTask({
    title: `Unzip template`,
    executor: async (ctx) => {
      await unzipTemplate({
        zipLocation: ctx.tmpArchive.path,
        destination: config.destination,
      })
    },
  })
}
