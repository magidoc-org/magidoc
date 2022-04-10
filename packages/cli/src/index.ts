import { Command } from 'commander'
import { readFileSync } from 'fs'
import buildGenerateCommand from './generate/command'
import buildInitCommand from './init/command'

const packageJson = JSON.parse(readFileSync('../package.json').toString()) as {
  version: string
}

const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you to get started building GraphQL documentation websites.\n',
  )
  .version(packageJson.version || 'unknown')

buildGenerateCommand(program)
buildInitCommand(program)

program.parse()
