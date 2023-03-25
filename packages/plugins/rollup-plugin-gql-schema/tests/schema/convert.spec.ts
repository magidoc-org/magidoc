import { convert } from '../../src/schema/convert'
import { describe, expect, it } from 'vitest'
import {
  buildClientSchema,
  buildSchema,
  type IntrospectionQuery,
  printSchema,
} from 'graphql'
import { getSample } from './utils'

const sdl = getSample('sdl.graphqls')
const introspection = getSample('introspection.json')
const schema = buildSchema(sdl)

describe('converting a schema', () => {
  it('converts a schema to SDL', () => {
    expect(removeEmptyLines(convert(schema, 'sdl'))).toEqual(
      removeEmptyLines(sdl.trim()),
    )
  })

  it('converts a schema to introspection', () => {
    expect(
      buildClientSchema(
        JSON.parse(convert(schema, 'introspection')) as IntrospectionQuery,
      ),
    ).toEqual(
      buildClientSchema(JSON.parse(introspection) as IntrospectionQuery),
    )
  })

  it('it keeps the directives when converting to SDL', () => {
    const withDirective = buildSchema(getSample('directive.graphqls'))
    const converted = convert(withDirective, 'sdl')
    // Once for the directive, second for the presence on field
    expect((converted.match(/@Auth/g) || []).length).toBe(2)
  })

  it('keeps the extensions and directives', () => {
    const withDirective = buildSchema(getSample('extend-query.graphqls'))
    const converted = convert(withDirective, 'sdl')
    expect(converted).toContain('extend type Query')
    expect(converted).toContain('test: String!')
    expect(converted).toContain('@Auth(scopes: ["test"])')
  })

  it('converts a schema built from introspection correctly to SDL', () => {
    const schema = buildClientSchema(
      JSON.parse(introspection) as IntrospectionQuery,
    )
    expect(convert(schema, 'sdl')).toEqual(printSchema(schema))
  })
})

function removeEmptyLines(str: string): string {
  return str
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .join('\n')
}
