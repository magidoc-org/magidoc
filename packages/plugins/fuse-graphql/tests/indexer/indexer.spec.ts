import { readFileSync } from 'fs'
import { GraphQLSchema, buildSchema } from 'graphql'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { index, type SearchResult } from '../../src'
import type Fuse from 'fuse.js'

describe('indexing graphql schema', () => {
  const schema = getSchema()
  const fuse: Fuse<SearchResult> = index(schema)

  it('should return indexes', () => {
    const results = fuse.search('This is an indexed query.')
    const first = results[0]
    expect(matches(first).flatMap((match) => match.indices)).toContainEqual([
      0, 24,
    ])
  })

  describe('queries', () => {
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

    it('should index query arguments', () => {
      const results = fuse.search('This is an indexed query argument.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('arguments.description')
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
  })

  describe('enums', () => {
    const enumResult = {
      name: 'IndexedEnum',
      description: 'This is an indexed enum.',
      graphqlType: 'enum',
      type: 'type',
      values: [
        {
          value: 'FIRST',
          description: 'This is an indexed first enum value.',
        },
        {
          value: 'SECOND',
          description: 'This is an indexed second enum value.',
        },
      ],
    }

    it('should index enum name', () => {
      const results = fuse.search('IndexedEnum')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(enumResult)
    })

    it('should index enum description', () => {
      const results = fuse.search('This is an indexed enum.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(enumResult)
    })

    it('should index enum value name', () => {
      const results = fuse.search('FIRST')
      const first = results[0]
      expect(matches(first)[0].key).toBe('values.value')
      expect(first.score).toBeCloseTo(0, 6)
      expect(first.item).toEqual(enumResult)
    })

    it('should index enum value description', () => {
      const results = fuse.search('This is an indexed second enum value.')
      const first = results[0]
      expect(matches(first)[0].key).toBe('values.description')
      expect(first.score).toBeCloseTo(0, 5)
      expect(first.item).toEqual(enumResult)
    })
  })

  describe('input objects', () => {
    const inputObjectValue = {
      type: 'type',
      graphqlType: 'input_object',
      name: 'InputArg',
      description: 'This is an indexed input arg.',
      fields: [
        {
          name: 'inputField',
          description: 'Input field description.',
        },
      ],
    }

    it('should index object name', () => {
      const results = fuse.search('InputArg')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(inputObjectValue)
    })

    it('should index object description', () => {
      const results = fuse.search('This is an indexed input arg.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(inputObjectValue)
    })

    it('should index object fields names', () => {
      const results = fuse.search('inputField')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.name')
      expect(first.item).toEqual(inputObjectValue)
    })

    it('should index object fields descriptions', () => {
      const results = fuse.search('Input field description.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.description')
      expect(first.item).toEqual(inputObjectValue)
    })
  })

  describe('objects', () => {
    const outputObjectValue = {
      type: 'type',
      graphqlType: 'object',
      name: 'OutputObject',
      description: 'This is an indexed output object.',
      fields: [
        {
          name: 'outputObjectField',
          description: 'Output field description.',
          arguments: [
            {
              name: 'outputFieldArg',
              description: 'Output field argument description.',
            },
          ],
        },
      ],
    }

    it('should index object name', () => {
      const results = fuse.search('OutputObject')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(outputObjectValue)
    })

    it('should index object description', () => {
      const results = fuse.search('This is an indexed output object.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(outputObjectValue)
    })

    it('should index object fields names', () => {
      const results = fuse.search('outputObjectField')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.name')
      expect(first.item).toEqual(outputObjectValue)
    })

    it('should index object fields descriptions', () => {
      const results = fuse.search('Output field description.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.description')
      expect(first.item).toEqual(outputObjectValue)
    })

    it('should index object fields arg names', () => {
      const results = fuse.search('outputFieldArg')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.arguments.name')
      expect(first.item).toEqual(outputObjectValue)
    })

    it('should index object fields arg descriptions', () => {
      const results = fuse.search('Output field argument description.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 4)
      expect(matches(first)[0].key).toBe('fields.arguments.description')
      expect(first.item).toEqual(outputObjectValue)
    })
  })

  describe('interfaces', () => {
    const interfaceValue = {
      type: 'type',
      graphqlType: 'interface',
      name: 'CustomInterface',
      description: 'This is an indexed interface type.',
      fields: [
        {
          name: 'interfaceField',
          description: 'Interface field description.',
          arguments: [
            {
              name: 'interfaceArg',
              description: 'Interface field argument.',
            },
          ],
        },
      ],
    }

    it('should index interface name', () => {
      const results = fuse.search('CustomInterface')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(interfaceValue)
    })

    it('should index interface description', () => {
      const results = fuse.search('This is an indexed interface type.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(interfaceValue)
    })

    it('should index interface fields names', () => {
      const results = fuse.search('interfaceField')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.name')
      expect(first.item).toEqual(interfaceValue)
    })

    it('should index interface fields descriptions', () => {
      const results = fuse.search('Interface field description.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.description')
      expect(first.item).toEqual(interfaceValue)
    })

    it('should index object fields arg names', () => {
      const results = fuse.search('interfaceArg')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('fields.arguments.name')
      expect(first.item).toEqual(interfaceValue)
    })

    it('should index object fields arg descriptions', () => {
      const results = fuse.search('Interface field argument.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 4)
      expect(matches(first)[0].key).toBe('fields.arguments.description')
      expect(first.item).toEqual(interfaceValue)
    })
  })

  describe('scalars', () => {
    const scalarValue = {
      type: 'type',
      graphqlType: 'scalar',
      name: 'CustomScalar',
      description: 'This is an indexed scalar.',
    }

    it('should index scalar name', () => {
      const results = fuse.search('CustomScalar')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(scalarValue)
    })

    it('should index scalar description', () => {
      const results = fuse.search('This is an indexed scalar.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(scalarValue)
    })
  })

  describe('union types', () => {
    const unionValue = {
      type: 'type',
      graphqlType: 'union',
      name: 'CustomUnion',
      description: 'This is an indexed union type.',
    }

    it('should index scalar name', () => {
      const results = fuse.search('CustomUnion')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('name')
      expect(first.item).toEqual(unionValue)
    })

    it('should index scalar description', () => {
      const results = fuse.search('This is an indexed union type.')
      const first = results[0]
      expect(first.score).toBeCloseTo(0, 6)
      expect(matches(first)[0].key).toBe('description')
      expect(first.item).toEqual(unionValue)
    })
  })
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
