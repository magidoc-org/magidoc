import { buildSchema, GraphQLSchema } from 'graphql'
import path from 'path'
import { parseGraphqlSchema } from '../../src/schema/parse'
import { describe, it, expect } from 'vitest'
import { getSample } from './utils'

const expected = buildSchema(getSample('sdl.graphqls'))

describe('when parsing a single file', () => {
  const file = relativeToAbsolute('./samples/sdl.graphqls')

  it('should create the introspection result properly', async () => {
    verifyEqualExpected(await run([file]))
  })
})

describe('when parsing a file with backslashes', () => {
  const file = relativeToAbsolute('./samples/sdl.graphqls').replaceAll(
    '/',
    '\\',
  )

  it('should create the introspection result properly', async () => {
    verifyEqualExpected(await run([file]))
  })
})

describe('when parsing glob files', () => {
  describe('with a single glob path', () => {
    const glob = relativeToAbsolute('./samples/multi-file/**/*.graphqls')

    it('should create the introspection result properly', async () => {
      verifyEqualExpected(await run([glob]))
    })
  })

  describe('with multiple paths', () => {
    const globs = [
      relativeToAbsolute('./samples/multi-file/sub-folder/*.graphqls'),
      relativeToAbsolute('./samples/multi-file/query.graphqls'),
      relativeToAbsolute('./samples/multi-file/*.graphqls'),
    ]

    it('should create the introspection result properly', async () => {
      verifyEqualExpected(await run(globs))
    })
  })
})

describe('providing no paths', () => {
  it('fails', async () => {
    await expect(async () => await run([])).rejects.toThrowError(
      'No paths found',
    )
  })
})

describe('providing garbage paths', () => {
  it('fails', async () => {
    await expect(async () => await run(['@sdfsa'])).rejects.toThrowError(
      'No paths found',
    )
  })
})

describe('providing non graphql files', () => {
  it('fails', async () => {
    await expect(
      async () => await run([relativeToAbsolute('./samples/**/*')]),
    ).rejects.toThrowError('Syntax Error')
  })
})

async function run(paths: string[]): Promise<GraphQLSchema> {
  return await parseGraphqlSchema({
    globPaths: paths,
  })
}

function relativeToAbsolute(target: string): string {
  return path.join(__dirname, target)
}

function verifyEqualExpected(first: GraphQLSchema) {
  expect(first.astNode).toStrictEqual(expected.astNode)
}
