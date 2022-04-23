import type { InitConfig } from '../config'
import { InitTask, newTask } from '../task'
import { rm } from 'fs'
import { promisify } from 'util'
import { templateConfigurationFile } from '../../generate/tasks/loadTemplateConfig'
const rmPromise = promisify(rm)

export function cleanAssetsTask(config: InitConfig): InitTask {
  return newTask({
    title: 'Clean assets',
    executor: async () => {
      await rmPromise(templateConfigurationFile(config.destination))
    },
  })
}
