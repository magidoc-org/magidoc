import fetchTemplate from '../../../template/fetch'
import type { InitTask } from '../task'
import { newTask } from '../task'
import { existsSync } from 'fs'
import type { InitConfig } from '../config'

export function verifyDestinationAvailableTask(config: InitConfig): InitTask {
  return newTask({
    title: `Verifying destination directory`,
    executor: async (ctx) => {
      if (existsSync(config.destination)) {
        throw new Error(
          `Destination directory '${config.destination}' already exists.`,
        )
      }

      await fetchTemplate({
        template: config.template,
        version: config.templateVersion,
        destination: ctx.tmpArchive.path,
      })
    },
  })
}
