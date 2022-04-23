import { Command, Option } from 'commander'
import generate from '.'
import path from 'path'
import { loadFileConfiguration } from '../utils/loadConfigFile'
import { withStacktrace } from '../utils/withStacktrace'
import chalk from 'chalk'
import type { FileConfiguration } from './config/types'

type GenerateCommandOptions = {
  file: string
  stacktrace: boolean
  clean: boolean
}

export const DEFAULT_CONFIG_FILE = './magidoc.mjs'

export default function buildGenerateCommand(program: Command) {
  program
    .command('generate')
    .description(
      "Generates a full static website using a template. Using this option doesn't give you the ability to customize the output website. If you wish to customize the website, use the init command to generate a fresh project.",
    )
    .addOption(
      new Option(
        '-f|--file <file.js|file.mjs|file.cjs>',
        'The magidoc configuration file location. By default, Magidoc looks for an ESModule Javascript file (mjs), but cjs is supported as well.',
      ).default(DEFAULT_CONFIG_FILE),
    )
    .addOption(
      new Option(
        '-c|--clean',
        'Clean install, so delete the local copy of the template if there is one and fetch it again.',
      ).default(false),
    )
    .addOption(
      new Option(
        '-s|--stacktrace',
        'Useful to debug errors. Will print the whole exception to the terminal in case the error message is not precise enough.',
      ).default(false),
    )
    .action(async ({ file, stacktrace, clean }: GenerateCommandOptions) => {
      const fileConfiguration = await loadFileConfiguration(file)
      if (!fileConfiguration) {
        process.exitCode = 1
        return
      }

      await withStacktrace(stacktrace, async () => {
        await generate({
          template: fileConfiguration.website.template,
          templateVersion: fileConfiguration.website.templateVersion,
          output: path.resolve(fileConfiguration.website.output),
          clean,
          options: fileConfiguration.website.options,
          fetchConfig: {
            url: fileConfiguration.introspection.url,
            headers: fileConfiguration.introspection.headers || {},
            method: fileConfiguration.introspection.method,
          },
        })

        printPostExecution(file, fileConfiguration)
      })
    })
}

function printPostExecution(
  configFile: string,
  fileConfiguration: FileConfiguration,
) {
  console.log()
  console.log('-----------')
  console.log()
  console.log(
    `Website generated at ${chalk.cyan(fileConfiguration.website.output)}`,
  )
  console.log()

  if (configFile === DEFAULT_CONFIG_FILE) {
    console.log(
      `Run ${chalk.cyan('magidoc preview')} to preview you build locally.`,
    )
  } else {
    console.log(
      `Run ${chalk.cyan(
        `magidoc preview --file ${configFile}`,
      )} to preview your build locally.`,
    )
  }

  console.log()
}
