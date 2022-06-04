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
import { templates } from '@magidoc/plugin-starter-variables'
import { CONFIG_FILE_OPTION, STACKTRACE_OPTION } from '../utils/commander'

export default function buildPreviewCommand(program: Command) {
  program
    .command('preview')
    .description(
      'Preview the documentation website generated with the generate `generate` command.',
    )
    .addOption(CONFIG_FILE_OPTION())
    .addOption(
      new Option(
        '-p|--port [number]',
        'The port on which to run the static server.',
      ),
    )
    .addOption(STACKTRACE_OPTION())
    .action(async ({ file, port, stacktrace }: PreviewCommandOptions) => {
      const fileConfiguration = await loadFileConfiguration(file, stacktrace)
      if (!fileConfiguration) {
        process.exitCode = 1
        return
      }

      await withStacktrace(stacktrace, () => {
        const root = fileConfiguration.website.options[templates.SITE_ROOT.name]
        preview({
          websiteLocation: path.resolve(fileConfiguration.website.output),
          port,
          siteRoot: root ? String(root) : undefined,
        })
      })
    })
}
