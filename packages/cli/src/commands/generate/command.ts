import { Command, Option } from 'commander'
import generate from '.'
import path from 'path'
import type { FileConfiguration } from './config/types'
import { readConfiguration } from './config/read'

type GenerateCommandOptions = {
  file: string
  stacktrace: boolean
  clean: boolean
}

export default function buildGenerateCommand(program: Command) {
  program
    .command('generate')
    .description(
      "Generates a full static website using a template. Using this option doesn't give you the ability to customize the output website. If you wish to customize the website, use the init command to generate a fresh project.",
    )
    .addOption(
      new Option(
        '-f|--file <magidoc.yml>',
        'The magidoc.yml configuration file location',
      ).default('./magidoc.yml'),
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
      const fileConfiguration = loadFileConfiguration(file)
      if (!fileConfiguration) {
        process.exitCode = 1
        return
      }

      try {
        await generate({
          template: fileConfiguration.website.template,
          templateVersion: fileConfiguration.website.templateVersion,
          output: path.resolve(fileConfiguration.website.output),
          clean,
          fetchConfig: {
            url: fileConfiguration.introspection.url,
            headers: Object.keys(
              fileConfiguration.introspection.headers || {},
            ).map((header) => {
              return {
                name: header,
                value: (fileConfiguration.introspection.headers || {})[header],
              }
            }),
            method: fileConfiguration.introspection.method,
          },
        })
      } catch (error) {
        process.exitCode = 2

        if (stacktrace) {
          console.log()
          console.log('------- Stacktrace -------')
          console.log(error)
        } else {
          console.log()
          console.log('For a more detailed output, run with --stacktrace')
        }
      }
    })
}

function loadFileConfiguration(configPath: string): FileConfiguration | null {
  try {
    return readConfiguration(configPath)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }

    return null
  }
}
