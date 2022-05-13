import { Command, Option } from 'commander'
import generate from '.'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import type { MagidocConfiguration } from '../../config/types'
import { cyan } from '../utils/outputColors'
import {
  PackageManagerType,
  PACKAGE_MANAGER_TYPES,
} from '../../node/packageManager'

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
      "Generates a full static website using a template. Using this option doesn't give you the ability to customize the output website. If you wish to customize the website, use the init command to generate a fresh project.",
    )
    .addOption(
      new Option(
        '-f|--file <file.js|file.mjs|file.cjs>',
        'The magidoc configuration file location. By default, Magidoc looks for an ESModule Javascript file (mjs), but cjs is supported as well.',
      ).default(DEFAULT_CONFIG_FILE),
    )
    .addOption(
      new Option(
        '-p|--package-manager <package-manager>',
        'Selects a different Package Manager. By default, Magidoc will try to use any package manager available in order of preference. Recommended is pnpm.',
      ).choices(PACKAGE_MANAGER_TYPES),
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
      }: GenerateCommandOptions) => {
        const fileConfiguration = await loadFileConfiguration(file)
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
  console.log()
  console.log('-----------')
  console.log()
  console.log(`Website generated at ${cyan(fileConfiguration.website.output)}`)
  console.log()

  if (configFile === DEFAULT_CONFIG_FILE) {
    console.log(`Run ${cyan('magidoc preview')} to preview you build locally.`)
  } else {
    console.log(
      `Run ${cyan(
        `magidoc preview --file ${configFile}`,
      )} to preview your build locally.`,
    )
  }

  console.log()
}
