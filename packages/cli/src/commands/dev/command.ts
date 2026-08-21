import { type Command, Option } from 'commander'
import path from 'path'
import { CLEAN_OPTION, CONFIG_FILE_OPTION, newPortOption, STACKTRACE_OPTION } from '../utils/commander'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import runDevelopmentServer from '.'

type DevCommandOptions = {
  file: string
  host: string
  port: number
  stacktrace: boolean
  clean: boolean
}

export default function buildDevCommand(program: Command) {
  program
    .command('dev')
    .description('Starts a development server with hot-reload as changes occur to watched files.')
    .addOption(new Option('-h|--host <host>', 'The host to bind the development server to.').default('localhost'))
    .addOption(newPortOption('The port to bind the development server to.', 3000))
    .addOption(CONFIG_FILE_OPTION())
    .addOption(CLEAN_OPTION())
    .addOption(STACKTRACE_OPTION())
    .action(async ({ host, port, file, stacktrace, clean }: DevCommandOptions) => {
      const fileConfiguration = await loadFileConfiguration(file, stacktrace)
      if (!fileConfiguration) {
        process.exitCode = 1
        return
      }

      await withStacktrace(stacktrace, async () => {
        await runDevelopmentServer({
          ...fileConfiguration,
          magidocConfigLocation: path.resolve(file),
          host,
          port,
          stacktrace,
          clean,
        })
      })
    })
}
