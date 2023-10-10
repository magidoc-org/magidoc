import { templates } from '@magidoc/plugin-starter-variables'
import { executeAllTasks } from '../../tasks/runner'
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
import { writeEnvFileTask } from '../../tasks/all/writeEnvFile'
import type { GenerateTaskContext, GenerationConfig } from '../generate'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { cyan } from '../utils/outputColors'
import { watchFiles } from '../utils/watch'
import { printInfo, printSeparator } from '../utils/log'
import { getPortAvailability } from '../utils/port'

export type DevConfig = GenerationConfig & {
  host: string
  port: number
  stacktrace: boolean
  magidocConfigLocation: string
}

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
    writeEnvFileTask(config),
  ])

  const availability = await getPortAvailability(config.host, config.port)
  if (!availability.available) {
    throw new Error(
      `Port ${config.port} is not available: ${availability.reason} ${
        availability.code ? `(${availability.code})` : ''
      }`,
    )
  }

  // We don't have a choice to print this before.
  printServerListening(config)

  await Promise.all([
    ctx.packageManager.startDevServer({
      cwd: ctx.tmpDirectory.path,
      host: config.host,
      port: config.port,
    }),
    watchFiles(
      [
        config.magidocConfigLocation,
        config.website.staticAssets,
        ...config.dev.watch,
      ],
      async () => {
        const newMagidocConfig = await loadFileConfiguration(
          config.magidocConfigLocation,
          config.stacktrace,
        )

        const newDevConfig: DevConfig = {
          ...config,
          ...newMagidocConfig,
        }

        await executeAllTasks<DevTaskContext>(
          [
            loadGraphQLSchemaTask(newDevConfig),
            copyStaticAssetsTask(newDevConfig),
            writeEnvFileTask(newDevConfig),
          ],
          {
            ctx,
            silent: true,
          },
        )
      },
    ),
  ])
}

function printServerListening(config: DevConfig) {
  setTimeout(() => {
    const root = config.website.options[templates.SITE_ROOT.name]

    printSeparator()
    printInfo(
      `Server listening on ${cyan(
        `http://${config.host}:${config.port}${String(root || '')}`,
      )}`,
    )
  }, 500)
}
