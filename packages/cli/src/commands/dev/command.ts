import type { Command } from 'commander'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import runDevelopmentServer from '.'
import type { PackageManagerType } from '../../node/packageManager'
import path from 'path'
import {
  CLEAN_OPTION,
  CONFIG_FILE_OPTION,
  STACKTRACE_OPTION,
} from '../utils/commander'

type DevCommandOptions = {
  file: string
  packageManager?: PackageManagerType
  stacktrace: boolean
  clean: boolean
}

export default function buildDevCommand(program: Command) {
  program
    .command('dev')
    .description(
      'Starts a development server with hot-reload as changes occur to watched files.',
    )
    .addOption(CONFIG_FILE_OPTION())
    .addOption(CLEAN_OPTION())
    .addOption(STACKTRACE_OPTION())
    .action(
      async ({
        packageManager,
        file,
        stacktrace,
        clean,
      }: DevCommandOptions) => {
        const fileConfiguration = await loadFileConfiguration(file, stacktrace)
        if (!fileConfiguration) {
          process.exitCode = 1
          return
        }

        await withStacktrace(stacktrace, async () => {
          await runDevelopmentServer({
            ...fileConfiguration,
            magidocConfigLocation: path.resolve(file),
            stacktrace,
            packageManager,
            clean,
          })
        })
      },
    )
}
