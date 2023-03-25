import {
  buildClientSchema,
  getIntrospectionQuery,
  type GraphQLError,
  type GraphQLSchema,
  type IntrospectionQuery,
} from 'graphql'
import axios from 'axios'

type IntrospectionResponse = {
  errors?: GraphQLError[]
  data: IntrospectionQuery
}

type Parameters = {
  query?: string
  method?: Method
  headers?: Record<string, string>
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default async function queryGraphQLSchema(
  url: string,
  parameters: Parameters,
): Promise<GraphQLSchema> {
  const actualMethod: Method = parameters.method || 'POST'
  const body = JSON.stringify({
    operationName: 'IntrospectionQuery',
    query: parameters.query ?? getIntrospectionQuery().trim(),
    variables: null,
  })

  return axios({
    url: url,
    method: actualMethod,
    headers: {
      'Content-Type': 'application/json',
      ...(parameters.headers || {}),
    },
    data: body,
    responseType: 'json',
  })
    .then((res) => res.data as IntrospectionResponse)
    .then((res) => {
      if (res.errors && res.errors.length > 0) {
        throw new Error(
          `Introspection query failed: \n Method: ${actualMethod} \n Response: ${JSON.stringify(
            res,
          )} \n\n Query: ${body.replaceAll('\\n', '\n')}`,
        )
      }

      return buildClientSchema(res.data)
    })
}
