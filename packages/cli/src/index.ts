#! /usr/bin/env node

import { Command } from 'commander'
import buildGenerateCommand from './commands/generate/command'
import buildInitCommand from './commands/init/command'
import buildPreviewCommand from './commands/preview/command'
import { getVersion } from './version'
import type { MagidocConfiguration } from './config/types'

const version = getVersion()
const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you build beautiful and fully customizable GraphQL static documentation websites in seconds.',
  )
  .version(version)

buildGenerateCommand(program)
buildPreviewCommand(program)
buildInitCommand(program)

program.parse()

export type { MagidocConfiguration }
