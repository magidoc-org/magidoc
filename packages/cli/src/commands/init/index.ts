import { executeAllTasks } from '../../tasks'
import { determineTmpDirectoryTask } from '../../tasks/all/determineTmpDir'
import { fetchTemplateTask } from '../../tasks/all/fetchTemplate'
import { installDependenciesTask } from '../../tasks/all/installDependencies'
import { unzipTemplateTask } from '../../tasks/all/unzipTemplate'
import { verifyDestinationAvailableTask } from '../../tasks/all/verifyDestinationAvailable'
import { verifyPackageManagerAvailableTask } from '../../tasks/all/verifyPackageManagerAvailable'
import { tmpLocation } from '../../template/tmp'
import type { InitConfig } from './config'
import type { InitTaskContext } from './task'

export default async function init(config: InitConfig) {
  const destination = tmpLocation(config.destination)
  await executeAllTasks<InitTaskContext>([
    determineTmpDirectoryTask({
      ...config,
      // Slight hack to set the tmp directory to the target location.
      // This speeds up the installation
      tmpDirectory: destination,
    }),
    verifyPackageManagerAvailableTask(config),
    verifyDestinationAvailableTask(config),
    fetchTemplateTask(config),
    unzipTemplateTask(config),
    installDependenciesTask(),
  ])
}
