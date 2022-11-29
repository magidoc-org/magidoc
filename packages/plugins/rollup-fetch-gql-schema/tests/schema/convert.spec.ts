import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { convert } from '../../src/schema/convert'
import { describe, expect, it } from 'vitest'
import type { IntrospectionQuery } from 'graphql'

const sdl = getSample('sdl.graphqls')
const introspection = getSample('introspection.json')

describe('converting a schema', () => {
  it('converts a schema to SDL', () => {
    expect(
      convert(JSON.parse(introspection) as IntrospectionQuery, 'sdl'),
    ).toEqual(sdl)
  })

  it('converts a schema to introspection', () => {
    expect(
      convert(JSON.parse(introspection) as IntrospectionQuery, 'introspection'),
    ).toEqual(introspection)
  })
})

function getSample(name: string): string {
  return fs
    .readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'samples', name),
    )
    .toString()
}
