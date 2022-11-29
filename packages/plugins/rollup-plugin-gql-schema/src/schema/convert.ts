import { GraphQLSchema, introspectionFromSchema, printSchema } from 'graphql'

export type OutputFormat = 'sdl' | 'introspection'

export function convert(schema: GraphQLSchema, format: OutputFormat): string {
  switch (format) {
    case 'sdl':
      return printSchema(schema)
    case 'introspection':
      return JSON.stringify(introspectionFromSchema(schema))
    default:
      throw new Error(`Unknown format ${String(format)}`)
  }
}
