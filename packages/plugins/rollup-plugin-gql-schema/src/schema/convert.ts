import { type GraphQLSchema, introspectionFromSchema } from 'graphql'
import { printSchemaWithDirectives } from './print'

export type OutputFormat = 'sdl' | 'introspection'

export function convert(schema: GraphQLSchema, format: OutputFormat): string {
  switch (format) {
    case 'sdl':
      return printSchemaWithDirectives(schema)
    case 'introspection':
      return JSON.stringify(introspectionFromSchema(schema))
    default:
      throw new Error(`Unknown format ${String(format)}`)
  }
}
