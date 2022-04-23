import { Command, Option } from 'commander'
import init from '.'
import { AVAILABLE_TEMPLATES, Template } from '../../template'
import { getVersion } from '../../version'
import path from 'path'
import { withStacktrace } from '../utils/withStacktrace'
import {
  PackageManagerType,
  PACKAGE_MANAGER_TYPES,
} from '../../node/packageManager'

type InitCommandOptions = {
  template: Template
  templateVersion: string
  packageManager: PackageManagerType
  destination: string
  stacktrace: boolean
}
import chalk from 'chalk'

export default function buildInitCommand(program: Command) {
  program
    .command('init')
    .description(
      'Initializes a fresh documentation project using a template of your choice. You will then have the possibility to modify that template how you wish.\n',
    )
    .addOption(
      new Option(
        '-t|--template <template>',
        'Specifies the template name to use.',
      )
        .choices(AVAILABLE_TEMPLATES)
        .makeOptionMandatory(),
    )
    .addOption(
      new Option(
        '-e|--template-version <version>',
        'The target version of the template to use. Defaults to the current CLI version.',
      ).default(getVersion()),
    )
    .option(
      '-d|--destination <directory>',
      'Specifies the destination directory of the project',
      './docs',
    )
    .addOption(
      new Option(
        '-p|--package-manager <type>',
        'Selects a different Package Manager. Pnpm is the recommended default.',
      )
        .default('pnpm')
        .choices(PACKAGE_MANAGER_TYPES),
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
        template,
        templateVersion,
        destination,
        stacktrace,
      }: InitCommandOptions) => {
        await withStacktrace(stacktrace, async () => {
          await init({
            packageManagerType: packageManager,
            template,
            templateVersion,
            destination: path.resolve(destination),
          })

          console.log()
          console.log('-----------')
          console.log()

          console.log(`Template ${chalk.cyan(template)} created.`)
          console.log()
          console.log(
            `Run ${chalk.cyan(
              `cd ${destination} && ${packageManager} run dev`,
            )} and start editing!`,
          )
          console.log()
        })
      },
    )
}
