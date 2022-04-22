import { Command, Option } from 'commander'
import init from '.'
import { AVAILABLE_TEMPLATES, Template } from '../../template'
import { getVersion } from '../../version'
import path from 'path'
import { withStacktrace } from '../utils/withStacktrace'
import { RunnerType, RUNNER_TYPES } from '../../npm/runner'

type InitCommandOptions = {
  template: Template
  templateVersion: string
  runnerType: RunnerType
  destination: string
  stacktrace: boolean
}

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
        '-r|--runner-type <type>',
        'Selects a different NPM Runner. Pnpm is the recommended default.',
      )
        .default('pnpm')
        .choices(RUNNER_TYPES),
    )
    .addOption(
      new Option(
        '-s|--stacktrace',
        'Useful to debug errors. Will print the whole exception to the terminal in case the error message is not precise enough.',
      ).default(false),
    )
    .action(
      async ({
        runnerType,
        template,
        templateVersion,
        destination,
        stacktrace,
      }: InitCommandOptions) => {
        await withStacktrace(stacktrace, async () => {
          await init({
            runnerType,
            template,
            templateVersion,
            destination: path.resolve(destination),
          })
        })
      },
    )
}
