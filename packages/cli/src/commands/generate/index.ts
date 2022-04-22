import { clean as cleanTask } from './tasks/clean'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { selectPackageManagerTask } from './tasks/selectPackageManager'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { installDependenciesTask } from './tasks/installDependencies'
import { buildTemplateTask } from './tasks/buildTemplate'
import { moveOutputTask } from './tasks/moveOutput'
import type { GenerationConfig } from './config'
import { warnVersion } from './tasks/warnVersion'
import { loadTemplateConfiguration } from './tasks/loadTemplateConfig'
import { loadGraphQLSchema } from './tasks/loadGraphqlSchema'
import { executeAllTasks } from '../../tasks'

export default async function generate(config: GenerationConfig) {
  await executeAllTasks([
    warnVersion(config),
    determineTmpDirectoryTask(config),
    cleanTask(config),
    selectPackageManagerTask(),
    fetchTemplateTask(config),
    unzipTemplateTask(),
    installDependenciesTask(),
    loadTemplateConfiguration(),
    loadGraphQLSchema(config),
    buildTemplateTask(config),
    moveOutputTask(config),
  ])
}
