import { Command, Option } from 'commander'
import { withStacktrace } from '../utils/withStacktrace'
import path from 'path'

type PreviewCommandOptions = {
  file: string
  port?: number
  stacktrace: boolean
}

import preview from '.'
import { loadFileConfiguration } from '../utils/loadConfigFile'

export default function buildPreviewCommand(program: Command) {
  program
    .command('preview')
    .description(
      'Preview the documentation website generated with the generate `generate` command.',
    )
    .addOption(
      new Option(
        '-f|--file <file.js|file.mjs|file.cjs>',
        'The magidoc configuration file location. By default, Magidoc looks for an ESModule Javascript file (mjs), but cjs is supported as well.',
      ).default('./magidoc.mjs'),
    )
    .addOption(
      new Option(
        '-p|--port [number]',
        'The port on which to run the static server.',
      ),
    )
    .addOption(
      new Option(
        '-s|--stacktrace',
        'Useful to debug errors. Will print the whole exception to the terminal in case the error message is not precise enough.',
      ).default(false),
    )
    .action(async ({ file, port, stacktrace }: PreviewCommandOptions) => {
      const fileConfiguration = await loadFileConfiguration(file)
      if (!fileConfiguration) {
        process.exitCode = 1
        return
      }

      await withStacktrace(stacktrace, () => {
        preview({
          websiteLocation: path.resolve(fileConfiguration.website.output),
          port,
        })
      })
    })
}
