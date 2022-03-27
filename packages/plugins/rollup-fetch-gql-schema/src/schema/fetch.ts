import { getIntrospectionQuery, IntrospectionQuery } from 'graphql'

export default async function queryGraphQLSchema(
  url: string,
  headers?: Record<string, string>,
): Promise<IntrospectionQuery> {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: getIntrospectionQuery({
        descriptions: true,
        directiveIsRepeatable: true,
        inputValueDeprecation: true,
        schemaDescription: true,
        specifiedByUrl: true,
      }),
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data as IntrospectionQuery)
}
