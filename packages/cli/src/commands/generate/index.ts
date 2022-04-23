import { clean as cleanTask } from './tasks/clean'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { selectPackageManagerTask } from './tasks/selectPackageManager'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { installDependenciesTask } from './tasks/installDependencies'
import { buildTemplateTask } from './tasks/buildTemplate'
import { moveOutputTask } from './tasks/moveOutput'
import type { GenerationConfig } from './config'
import { warnVersionTask } from './tasks/warnVersion'
import { loadTemplateConfigurationTask } from './tasks/loadTemplateConfig'
import { loadGraphQLSchemaTask } from './tasks/loadGraphqlSchema'
import { executeAllTasks } from '../../tasks'

export default async function generate(config: GenerationConfig) {
  await executeAllTasks([
    warnVersionTask(config),
    determineTmpDirectoryTask(config),
    cleanTask(config),
    selectPackageManagerTask(),
    fetchTemplateTask(config),
    unzipTemplateTask(),
    installDependenciesTask(),
    loadTemplateConfigurationTask(),
    loadGraphQLSchemaTask(config),
    buildTemplateTask(config),
    moveOutputTask(config),
  ])
}
