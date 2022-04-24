import queryGraphQLSchema from '../../src/schema/query'
import nock from 'nock'
import { getIntrospectionQuery } from 'graphql'

const basePath = 'https://what-the-test.com'
const path = '/not-a-site'
const fullPath = `${basePath}${path}`

const introspectionResult = {
  data: 'whatever',
}

describe('fetching the graphql schema', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  describe('using default parameters', () => {
    const expectedRequest = getIntrospectionQuery({
      descriptions: true,
      directiveIsRepeatable: true,
      inputValueDeprecation: true,
      schemaDescription: true,
      specifiedByUrl: true,
    })

    describe('request succeeds', () => {
      beforeEach(() => {
        nock(basePath)
          .matchHeader('content-type', 'application/json')
          .post(path, {
            operationName: 'IntrospectionQuery',
            query: expectedRequest.trim(),
            variables: null,
          })
          .reply(200, introspectionResult)
      })

      it('uses the returns the introspection query result', async () => {
        const result = await queryGraphQLSchema(fullPath, {})
        expect(result).toBe(introspectionResult.data)
      })
    })

    describe('request fails with an invalid status', () => {
      beforeEach(() => {
        nock(basePath)
          .matchHeader('Content-Type', 'application/json')
          .post(path)
          .reply(401, introspectionResult)
      })

      it('throws an error', async () => {
        ;(
          await expect(async () => {
            await queryGraphQLSchema(fullPath, {})
          })
        ).rejects.toThrowError('Request failed with status code 401')
      })
    })
  })

  describe('providing a custom query', () => {
    const query = 'Potato'

    beforeEach(() => {
      nock(basePath)
        .post(path, {
          operationName: 'IntrospectionQuery',
          query: query,
          variables: null,
        })
        .reply(200, introspectionResult)
    })

    it('uses the custom headers', async () => {
      const result = await queryGraphQLSchema(fullPath, { query: query })

      expect(result).toBe(introspectionResult.data)
    })
  })

  describe('providing a custom method', () => {
    beforeEach(() => {
      nock(basePath).get(path).reply(200, introspectionResult)
    })

    it('uses the custom method', async () => {
      const result = await queryGraphQLSchema(fullPath, {
        method: 'GET',
      })

      expect(result).toBe(introspectionResult.data)
    })
  })

  describe('providing custom headers', () => {
    const authorization = 'Bearer abc'

    beforeEach(() => {
      nock(basePath)
        .matchHeader('Authorization', authorization)
        .post(path)
        .reply(200, introspectionResult)
    })

    it('uses the custom headers', async () => {
      const result = await queryGraphQLSchema(fullPath, {
        headers: {
          Authorization: authorization,
        },
      })

      expect(result).toBe(introspectionResult.data)
    })
  })
})
