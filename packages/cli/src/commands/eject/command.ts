import { Command, Option } from 'commander'
import eject from '.'
import { AVAILABLE_TEMPLATES, type Template } from '../../template'
import { getVersion } from '../../version'
import path from 'path'
import { withStacktrace } from '../utils/withStacktrace'
import {
  type PackageManagerType,
  PACKAGE_MANAGER_TYPES,
} from '../../node/packageManager'

type EjectCommandOptions = {
  template: Template
  templateVersion: string
  packageManager: PackageManagerType
  destination: string
  stacktrace: boolean
}
import { cyan } from '../utils/outputColors'
import { STACKTRACE_OPTION } from '../utils/commander'
import { printInfo, printLine, printSeparator } from '../utils/log'

export default function buildEjectCommand(program: Command) {
  program
    .command('eject')
    .description(
      'Ejects from Magidoc basic template configuration, to allow for full customization of the template. This will initialize a folder from a template of your choice, which can then be modified however you wish.\n',
    )
    .addOption(
      new Option('-t|--template <template>', 'The name of the template to use.')
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
      './template',
    )
    .addOption(
      new Option(
        '-p|--package-manager <type>',
        'Selects a different Package Manager. Pnpm is the recommended default.',
      )
        .default('pnpm')
        .choices(PACKAGE_MANAGER_TYPES),
    )
    .addOption(STACKTRACE_OPTION())
    .action(
      async ({
        packageManager,
        template,
        templateVersion,
        destination,
        stacktrace,
      }: EjectCommandOptions) => {
        await withStacktrace(stacktrace, async () => {
          await eject({
            packageManager,
            website: {
              template,
              templateVersion,
            },
            destination: path.resolve(destination),
          })

          printSeparator()

          printInfo(
            `Template ${cyan(template)} created at ${cyan(destination)}`,
          )
          printLine()
        })
      },
    )
}
