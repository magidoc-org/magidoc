import type { Command } from 'commander'
import generate from '.'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import type { MagidocConfiguration } from '../../config/types'
import { cyan } from '../utils/outputColors'
import type { PackageManagerType } from '../../node/packageManager'
import {
  CLEAN_OPTION,
  CONFIG_FILE_OPTION,
  PACKAGE_MANAGER_OPTION,
  STACKTRACE_OPTION,
} from '../utils/commander'
import { printInfo, printLine, printSeparator } from '../utils/log'

type GenerateCommandOptions = {
  file: string
  packageManager?: PackageManagerType
  stacktrace: boolean
  clean: boolean
}

export const DEFAULT_CONFIG_FILE = './magidoc.mjs'

export default function buildGenerateCommand(program: Command) {
  program
    .command('generate')
    .description(
      'Generates a full static website using a template. Using this command gives you access to a limited range of customization. If you wish to customize the website further than what is available, use the eject command.',
    )
    .addOption(CONFIG_FILE_OPTION())
    .addOption(PACKAGE_MANAGER_OPTION())
    .addOption(CLEAN_OPTION())
    .addOption(STACKTRACE_OPTION())
    .action(
      async ({
        packageManager,
        file,
        stacktrace,
        clean,
      }: GenerateCommandOptions) => {
        const fileConfiguration = await loadFileConfiguration(file, stacktrace)
        if (!fileConfiguration) {
          process.exitCode = 1
          return
        }

        await withStacktrace(stacktrace, async () => {
          await generate({
            ...fileConfiguration,
            packageManager,
            clean,
          })

          printPostExecution(file, fileConfiguration)
        })
      },
    )
}

function printPostExecution(
  configFile: string,
  fileConfiguration: MagidocConfiguration,
) {
  printSeparator()
  printInfo(`Website generated at ${cyan(fileConfiguration.website.output)}`)
  printLine()

  if (configFile === DEFAULT_CONFIG_FILE) {
    printInfo(`Run ${cyan('magidoc preview')} to preview you build locally.`)
  } else {
    printInfo(
      `Run ${cyan(
        `magidoc preview --file ${configFile}`,
      )} to preview your build locally.`,
    )
  }

  printLine()
}
