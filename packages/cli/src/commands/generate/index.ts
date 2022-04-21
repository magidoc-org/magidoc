import { Listr } from 'listr2'
import { clean as cleanTask } from './tasks/clean'
import { determineTmpDirectoryTask } from './tasks/determineTmpDir'
import { selectNpmRunnerTask } from './tasks/selectNpmRunner'
import { fetchTemplateTask } from './tasks/fetchTemplate'
import { unzipTemplateTask } from './tasks/unzipTemplate'
import { installDependenciesTask } from './tasks/installDependencies'
import { buildTemplateTask } from './tasks/buildTemplate'
import { moveOutputTask } from './tasks/moveOutput'
import type { TaskContext } from './task'
import type { GenerationConfig } from './config'
import { warnVersion } from './tasks/warnVersion'
import { loadTemplateConfiguration } from './tasks/loadTemplateConfig'
import { loadGraphQLSchema } from './tasks/loadGraphqlSchema'

export default async function generate(config: GenerationConfig) {
  const listr = new Listr<TaskContext>(
    [
      warnVersion(config),
      determineTmpDirectoryTask(config),
      cleanTask(config),
      selectNpmRunnerTask(),
      fetchTemplateTask(config),
      unzipTemplateTask(),
      loadGraphQLSchema(config),
      loadTemplateConfiguration(),
      installDependenciesTask(),
      buildTemplateTask(config),
      moveOutputTask(config),
    ],
    {
      exitOnError: true,
      rendererOptions: {
        showTimer: true,
      },
    },
  )

  await listr.run()
}
