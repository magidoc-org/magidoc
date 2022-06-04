import { executeAllTasks } from '../../tasks'
import { cleanTask } from '../../tasks/all/clean'
import { copyStaticAssetsTask } from '../../tasks/all/copyStaticAssets'
import { determineTmpDirectoryTask } from '../../tasks/all/determineTmpDir'
import { fetchTemplateTask } from '../../tasks/all/fetchTemplate'
import { installDependenciesTask } from '../../tasks/all/installDependencies'
import { loadGraphQLSchemaTask } from '../../tasks/all/loadGraphqlSchema'
import { resolveTemplateConfigurationTask } from '../../tasks/all/resolveTemplateConfig'
import { selectPackageManagerTask } from '../../tasks/all/selectPackageManager'
import { unzipTemplateTask } from '../../tasks/all/unzipTemplate'
import { warnVersionTask } from '../../tasks/all/warnVersion'
import { writeEnvFile } from '../../tasks/all/writeEnvFile'
import type { GenerateTaskContext, GenerationConfig } from '../generate'

export type DevConfig = GenerationConfig

export type DevTaskContext = GenerateTaskContext

export default async function runDevelopmentServer(config: DevConfig) {
  const ctx = await executeAllTasks<DevTaskContext>([
    warnVersionTask(config),
    determineTmpDirectoryTask(config),
    cleanTask(config),
    selectPackageManagerTask(config),
    fetchTemplateTask(config),
    unzipTemplateTask(config),
    installDependenciesTask(),
    resolveTemplateConfigurationTask(),
    loadGraphQLSchemaTask(config),
    copyStaticAssetsTask(config),
    writeEnvFile(config),
  ])

  console.log(ctx)
}
