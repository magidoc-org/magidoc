#! /usr/bin/env node

import { Command } from 'commander'
import buildDevCommand from './commands/dev/command'
import buildEjectCommand from './commands/eject/command'
import buildGenerateCommand from './commands/generate/command'
import buildPreviewCommand from './commands/preview/command'
import type { MagidocConfiguration } from './config/types'
import { loadMarkdownPagesTree } from './utils/pages'
import { getVersion } from './version'

const version = getVersion()
const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you build beautiful and fully customizable GraphQL static documentation websites in seconds.',
  )
  .version(version)

buildGenerateCommand(program)
buildPreviewCommand(program)
buildDevCommand(program)
buildEjectCommand(program)

program.parse()

export type { MagidocConfiguration }

export { loadMarkdownPagesTree }
