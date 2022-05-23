import { executeAllTasks } from '../../tasks'
import type { InitConfig } from './config'
import { verifyPackageManagerIsAvailableTask } from './tasks/verifyPackageManagerAvailable'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { verifyDestinationAvailableTask } from './tasks/verifyDestinationAvailable'
import { installDependenciesTask } from './tasks/installDependencies'

export default async function init(config: InitConfig) {
  await executeAllTasks([
    determineTmpDirectoryTask(config),
    verifyPackageManagerIsAvailableTask(config),
    verifyDestinationAvailableTask(config),
    fetchTemplateTask(config),
    unzipTemplateTask(config),
    installDependenciesTask(config),
  ])
}
