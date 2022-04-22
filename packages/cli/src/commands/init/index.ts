import { executeAllTasks } from '../../tasks'
import type { InitConfig } from './config'
import { verifyNpmRunnerAvailableTask } from './tasks/verifyRunnerAvailable'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { verifyDestinationAvailableTask } from './tasks/verifyDestinationAvailable'

export default async function init(config: InitConfig) {
  await executeAllTasks([
    verifyNpmRunnerAvailableTask(config),
    verifyDestinationAvailableTask(config),
    determineTmpDirectoryTask(config),
    fetchTemplateTask(config),
    unzipTemplateTask(config),
  ])
}
