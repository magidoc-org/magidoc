import { convert } from '../../src/schema/convert'
import { describe, expect, it } from 'vitest'
import { buildClientSchema, buildSchema, IntrospectionQuery } from 'graphql'
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
})

function removeEmptyLines(str: string): string {
  return str
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .join('\n')
}
