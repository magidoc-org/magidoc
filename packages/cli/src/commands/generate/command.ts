import { Command, Option } from 'commander'
import generate from '.'
import { availableTemplates, Template } from '../../template'
import { KeyValue, parseKeyValuePair } from '../../utils/args'
import type { Method } from './schema/fetch'

type GenerateCommandOptions = {
  template: Template
  templateVersion: string
  output: string
  url: string
  method: Method
  header: KeyValue[]
}

export default function buildGenerateCommand(
  program: Command,
  version: string,
) {
  program
    .command('generate')
    .description(
      "Generates a full static website using a template. Using this option doesn't give you the ability to customize the output website. If you wish to customize the website, use the init command to generate a fresh project.",
    )
    .addOption(
      new Option('-t|--template <name>', 'Specifies the target template')
        .choices(availableTemplates())
        .default(availableTemplates()[0]),
    )
    .addOption(
      new Option(
        '-e|--template-version <version>',
        'Specifies the target template version. This defaults to the current CLI version. Note that there may be issues when fetching templates from a different version from the current one, so use this option at your own risk.',
      ).default(version),
    )
    .option(
      '-o|--output <destination>',
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
    .action(
      async ({
        output,
        url,
        method,
        header,
        template,
        templateVersion,
      }: GenerateCommandOptions) => {
        await generate({
          template,
          templateVersion,
          output,
          fetchConfig: {
            url,
            headers: header,
            method,
          },
        })
      },
    )
}
