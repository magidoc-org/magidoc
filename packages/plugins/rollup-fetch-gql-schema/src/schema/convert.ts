import { buildClientSchema, IntrospectionQuery, printSchema } from 'graphql'

export type IntrospectionFormat = 'sdl' | 'introspection'

export function convert(
  schema: IntrospectionQuery,
  format: IntrospectionFormat,
): string {
  switch (format) {
    case 'sdl':
      return printSchema(buildClientSchema(schema))
    case 'introspection':
      return JSON.stringify(schema)
    default:
      throw new Error(`Unknown format ${String(format)}`)
  }
}
