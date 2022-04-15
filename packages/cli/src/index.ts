#! /usr/bin/env node

import { Command } from 'commander'
import { readFileSync } from 'fs'
import buildGenerateCommand from './commands/generate/command'
import buildInitCommand from './commands/init/command'

const packageJson = JSON.parse(readFileSync('./package.json').toString()) as {
  version: string
}

const version: string = packageJson.version
if (!version) {
  throw new Error(
    'Expected version to be defined in package.json. Could not extract version number, but it is required to fetch the right template versions.',
  )
}

const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you to get started building GraphQL documentation websites.',
  )
  .version(version)

buildGenerateCommand(program, version)
buildInitCommand(program)

program.parse()
