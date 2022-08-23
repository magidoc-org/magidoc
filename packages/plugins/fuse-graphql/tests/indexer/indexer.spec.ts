import { readFileSync } from 'fs'
import { GraphQLSchema, buildSchema } from 'graphql'
import path from 'path'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it } from 'vitest'
import { index, SearchResult } from '../../src'
import type Fuse from 'fuse.js'

describe('indexing graphql schema', () => {
  const schema = getSchema()
  let fuse: Fuse<SearchResult>

  beforeEach(() => {
    fuse = index(schema)
  })

  it('should return indexes', () => {
    const results = fuse.search('This is an indexed query.')
    const first = results[0]
    expect(matches(first).flatMap((match) => match.indices)).toContainEqual([
      0, 24,
    ])
  })

  it('should index queries', () => {
    const results = fuse.search('This is an indexed query.')
    const first = results[0]
    expect(first.score).toBeCloseTo(0, 6)
    expect(matches(first)[0].key).toBe('description')
    expect(first.item).toEqual({
      type: 'query',
      name: 'query',
      description: 'This is an indexed query.',
      arguments: [
        {
          name: 'queryArg',
          description: 'This is an indexed query argument.',
        },
      ],
    })
  })

  it('should index mutations', () => {
    const results = fuse.search('This is an indexed mutation.')
    const first = results[0]
    expect(first.score).toBeCloseTo(0, 6)
    expect(matches(first)[0].key).toBe('description')
    expect(first.item).toEqual({
      type: 'mutation',
      name: 'mutation',
      description: 'This is an indexed mutation.',
      arguments: [
        {
          name: 'mutationArg',
          description: 'This is an indexed mutation argument.',
        },
      ],
    })
  })

  it('should index subscriptions', () => {
    const results = fuse.search('This is an indexed subscription.')
    const first = results[0]
    expect(first.score).toBeCloseTo(0, 6)
    expect(matches(first)[0].key).toBe('description')
    expect(first.item).toEqual({
      type: 'subscription',
      name: 'subscription',
      description: 'This is an indexed subscription.',
      arguments: [
        {
          name: 'subscriptionArg',
          description: 'This is an indexed subscription argument.',
        },
      ],
    })
  })

  it('should index arguments', )
})

function matches(
  result: Fuse.FuseResult<SearchResult>,
): readonly Fuse.FuseResultMatch[] {
  return result.matches || []
}

function getSchema(): GraphQLSchema {
  return buildSchema(
    readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        '../schema.graphqls',
      ),
      'utf-8',
    ),
  )
}
