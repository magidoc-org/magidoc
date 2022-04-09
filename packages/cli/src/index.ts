import { Command } from 'commander'
import { readFileSync } from 'fs'

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

program
  .command('init')
  .description(
    'Initializes a fresh documentation project using a template. You will then have the possibility to modify that template how you wish.\n',
  )

const args = program.parse()
console.log(args)
