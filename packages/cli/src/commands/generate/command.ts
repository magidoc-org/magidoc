import { Command, Option } from 'commander'
import generate from '.'
import { KeyValue, parseKeyValuePair } from '../../utils/args'
import type { Method } from './schema/fetch'

type GenerateCommandOptions = {
  output: string
  url: string
  method: Method
  header: KeyValue[]
}

export default function buildGenerateCommand(program: Command) {
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
    .addOption(
      new Option(
        '-u|--url <url>',
        'Specifies the target GraphQL API to fetch the schema from using the introspection query',
      ),
    )
    .addOption(
      new Option(
        '-m|--method <method>',
        'The HTTP method to use to fetch the GraphQL Schema',
      )
        .choices(['POST', 'GET', 'PUT', 'DELETE'])
        .default('POST'),
    )
    .addOption(
      new Option(
        '-h|--header [name=value...]',
        'Specifies headers to pass to the query in the format <name>=<value>. Can be specified multiple times.',
      )
        .default([])
        .argParser((value: string, previous: KeyValue[]) => [
          ...previous,
          parseKeyValuePair(value),
        ]),
    )
    .action(({ output, url, method, header }: GenerateCommandOptions) => {
      generate({
        output,
        fetchConfig: {
          url,
          headers: header,
          method,
        },
      })
    })
}
