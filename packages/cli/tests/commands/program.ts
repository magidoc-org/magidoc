/* eslint-disable @typescript-eslint/no-empty-function */
import { Command } from 'commander'

export function makeTestProgram(): Command {
  const program = new Command()

  program.name('Unit tests')

  program.exitOverride()

  program.configureOutput({
    writeOut: () => {},
    writeErr: () => {},
  })

  return program
}
