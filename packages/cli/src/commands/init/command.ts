import type { Command } from 'commander'

export default function buildInitCommand(program: Command) {
  program
    .command('init')
    .description(
      'Initializes a fresh documentation project using a template. You will then have the possibility to modify that template how you wish.\n',
    )
    .option(
      '-d|--directory [destination]',
      'Specifies the destination directory of the project',
      './docs',
    )
    .action((directory: string) => {
      console.log(directory)
    })
}
