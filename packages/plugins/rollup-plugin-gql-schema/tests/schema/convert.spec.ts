import { convert } from '../../src/schema/convert'
import { describe, expect, it } from 'vitest'
import { buildClientSchema, buildSchema, IntrospectionQuery } from 'graphql'
import { getSample } from './utils'

const sdl = getSample('sdl.graphqls')
const introspection = getSample('introspection.json')
const schema = buildSchema(sdl)

describe('converting a schema', () => {
  it('converts a schema to SDL', () => {
    expect(convert(schema, 'sdl')).toEqual(sdl)
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
})
