import { fetchSchema } from '@magidoc/rollup-plugin-gql-schema'
import { parseSchema } from '@magidoc/rollup-plugin-gql-schema'
import { describe, expect, it, vi } from 'vitest'
import { loadGraphQLSchemaTask } from '../../../src/tasks/all/loadGraphqlSchema'
import { taskWrapperMock } from './utils'
import fs from 'fs/promises'

vi.mock('@magidoc/rollup-plugin-gql-schema')
vi.mock('fs/promises')

describe('loading graphql schema', () => {
  const defaultConfig = {}
  const ctx = {
    templateConfiguration: {
      supportedOptions: [],
      schemaTargetLocation: 'target/location',
      staticAssetsLocation: 'static/assets',
      envFileLocation: 'env/file',
    },
  }

  describe('task is enabled', () => {
    describe('introspection is of type url', () => {
      const config = {
        ...defaultConfig,
        introspection: {
          type: 'url' as const,
          url: 'http://localhost:8080/graphql',
          method: 'POST' as const,
          query: 'query { __schema { types { name } } }',
          headers: { Authorization: 'Bearer test-thing' },
        },
      }

      it('should load the schema', async () => {
        const task = loadGraphQLSchemaTask(config)
        await task.executor(ctx, taskWrapperMock())
        expect(fetchSchema).toHaveBeenCalledWith({
          url: config.introspection.url,
          method: config.introspection.method,
          query: config.introspection.query,
          headers: config.introspection.headers,
          target: ctx.templateConfiguration.schemaTargetLocation,
          format: 'sdl',
        })
      })
    })

    describe('introspection is of type sdl', () => {
      const config = {
        ...defaultConfig,
        introspection: {
          type: 'sdl' as const,
          paths: ['src/schema.graphql'] as [string, ...string[]],
        },
      }

      it('should parse the schema', async () => {
        const task = loadGraphQLSchemaTask(config)
        await task.executor(ctx, taskWrapperMock())
        expect(parseSchema).toHaveBeenCalledWith({
          paths: config.introspection.paths,
          target: ctx.templateConfiguration.schemaTargetLocation,
          format: 'sdl',
        })
      })
    })

    describe('introspection is of type raw', () => {
      const config = {
        ...defaultConfig,
        introspection: {
          type: 'raw' as const,
          content: 'raw content',
        },
      }

      it('should write the schema', async () => {
        const task = loadGraphQLSchemaTask(config)
        await task.executor(ctx, taskWrapperMock())
        expect(fs.writeFile).toHaveBeenCalledWith(
          ctx.templateConfiguration.schemaTargetLocation,
          config.introspection.content,
        )
      })
    })

    describe('introspection is of type none', () => {
      const config = {
        ...defaultConfig,
        introspection: {
          type: 'none' as const,
        },
      }

      it('should write an empty schema', async () => {
        const task = loadGraphQLSchemaTask(config)
        await task.executor(ctx, taskWrapperMock())
        expect(fs.writeFile).toHaveBeenCalledWith(
          ctx.templateConfiguration.schemaTargetLocation,
          '',
        )
      })
    })
  })
})
