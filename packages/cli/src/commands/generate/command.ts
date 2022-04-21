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
        '-f|--file <magidoc.js>',
        'The magidoc.js configuration file location',
      ).default('./magidoc.js'),
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

      try {
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

async function loadFileConfiguration(
  configPath: string,
): Promise<FileConfiguration | null> {
  try {
    return await readConfiguration(path.resolve(configPath))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }

    return null
  }
}
