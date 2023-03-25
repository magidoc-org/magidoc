import type { MagidocConfiguration } from '../../config/types'
import type {
  PackageManager,
  PackageManagerType,
} from '../../node/packageManager'
import { executeAllTasks } from '../../tasks/runner'
import { buildTemplateTask } from '../../tasks/all/buildTemplate'
import { cleanTask } from '../../tasks/all/clean'
import { copyStaticAssetsTask } from '../../tasks/all/copyStaticAssets'
import { determineTmpDirectoryTask } from '../../tasks/all/determineTmpDir'
import { fetchTemplateTask } from '../../tasks/all/fetchTemplate'
import { installDependenciesTask } from '../../tasks/all/installDependencies'
import { loadGraphQLSchemaTask } from '../../tasks/all/loadGraphqlSchema'
import { moveOutputTask } from '../../tasks/all/moveOutput'
import {
  type ResolvedMagidocTemplateConfig,
  resolveTemplateConfigurationTask,
} from '../../tasks/all/resolveTemplateConfig'
import { selectPackageManagerTask } from '../../tasks/all/selectPackageManager'
import { unzipTemplateTask } from '../../tasks/all/unzipTemplate'
import { warnVersionTask } from '../../tasks/all/warnVersion'
import { writeEnvFileTask } from '../../tasks/all/writeEnvFile'
import type { TmpLocation } from '../../template/tmp'

export type GenerationConfig = MagidocConfiguration & {
  packageManager?: PackageManagerType
  clean: boolean
}

export type GenerateTaskContext = {
  tmpArchive: TmpLocation
  tmpDirectory: TmpLocation
  templateConfiguration: ResolvedMagidocTemplateConfig
  packageManager: PackageManager
}

export default async function generate(config: GenerationConfig) {
  await executeAllTasks<GenerateTaskContext>([
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
    writeEnvFileTask(config),
    buildTemplateTask(),
    moveOutputTask(config),
  ])
}
