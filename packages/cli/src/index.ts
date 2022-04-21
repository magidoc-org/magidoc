#! /usr/bin/env node

import { Command } from 'commander'
import buildGenerateCommand from './commands/generate/command'
import type { FileConfiguration } from './commands/generate/config/types'
import buildInitCommand from './commands/init/command'
import { getVersion } from './version'

const version = getVersion()
const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you to get started building GraphQL documentation websites.',
  )
  .version(version)

buildGenerateCommand(program)
buildInitCommand(program)

program.parse()

export type { FileConfiguration as GenerationConfiguration }
