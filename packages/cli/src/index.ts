import { Command, Option } from 'commander'
import { readFileSync } from 'fs'
import generate from './generate/generate'

const packageJson = JSON.parse(readFileSync('../package.json').toString()) as {
  version: string
}

const program = new Command()
  .name('Magidoc')
  .description(
    'Magidoc CLI helps you to get started building GraphQL documentation websites.\n',
  )
  .version(packageJson.version || 'unknown')

program
  .command('generate')
  .description(
    "Generates a full static website using a template. Using this option doesn't give you the ability to customize the output website. If you wish to customize the website, use the init command to generate a fresh project.",
  )
  .option(
    '-o|--output [destination]',
    'Specifies the output directory of the built website',
    './build',
  )
  .addOption(new Option(
      '-u|--url [url]',
      'Specifies the target GraphQL API to fetch the schema from using the introspection query'
  ))
  .addOption(
    new Option(
      '-h|--header [header...]',
      'Specifies headers to pass to the query. ',
    ),
  )
  
  .action((output: string) => {
    generate({
      output,
    })
  })

program
  .command('init')
  .description(
    'Initializes a fresh documentation project using a template. You will then have the possibility to modify that template how you wish.\n',
  )
  .option(
    '-d|--directory [destination]',
    'Specifies the destination directory of the project',
    './docs',
  )
  .action((directory: string) => {
    console.log(directory)
  })

program.parse()
