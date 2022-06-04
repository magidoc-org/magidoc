import { Command, Option } from 'commander'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import runDevelopmentServer from '.'
import type { PackageManagerType } from '../../node/packageManager'
import path from 'path'

type DevCommandOptions = {
  file: string
  packageManager?: PackageManagerType
  stacktrace: boolean
  clean: boolean
}

export const DEFAULT_CONFIG_FILE = './magidoc.mjs'

export default function buildDevCommand(program: Command) {
  program
    .command('dev')
    .description(
      'Starts a development server with hot-reload as changes occur to watched files.',
    )
    .addOption(
      new Option(
        '-f|--file <file.js|file.mjs|file.cjs>',
        'The magidoc configuration file location. By default, Magidoc looks for an ESModule Javascript file (mjs), but cjs is supported as well.',
      ).default(DEFAULT_CONFIG_FILE),
    )
    .addOption(
      new Option(
        '-c|--clean',
        'Clean install, so delete the local copy of the template if there is one and fetch it again.',
      ).default(false),
    )
    .addOption(
      new Option(
        '-s|--stacktrace',
        'Useful to debug errors. Will print the whole exception to the terminal in case the error message is not precise enough.',
      ).default(false),
    )
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
