import { getIntrospectionQuery, GraphQLError, IntrospectionQuery } from 'graphql'
import fetch from "node-fetch";

type IntrospectionResponse = {
    errors?: GraphQLError[]
    data: IntrospectionQuery
}

export default async function queryGraphQLSchema(
  url: string,
  method?: string,
  headers?: Record<string, string>,
): Promise<IntrospectionQuery> {
  const actualMethod = method || 'POST'
  const body = JSON.stringify({
    operationName: 'IntrospectionQuery',
    query: getIntrospectionQuery({
      descriptions: true,
      directiveIsRepeatable: true,
      inputValueDeprecation: true,
      schemaDescription: true,
      specifiedByUrl: true,
    }).trim(),
    variables: null,
  })

  return fetch(url, {
    method: actualMethod,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body,
  })
    .then((res) => res.json() as unknown as IntrospectionResponse)
    .then((res) => {
      if (res.errors && res.errors.length > 0) {
        throw new Error(
          `Introspection query failed: \n Method: ${actualMethod} \n Response: ${JSON.stringify(
            res,
          )} \n\n Query: ${body.replaceAll('\\n', '\n')}`,
        )
      }

      return res.data as IntrospectionQuery
    })
}
