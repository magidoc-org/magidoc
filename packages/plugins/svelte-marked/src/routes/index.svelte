<script lang="ts">
  import Markdown from '$lib/markdown/Markdown.svelte'
  import CustomHr from './CustomHr.svelte'
</script>

<body style="padding:1rem">
  <Markdown
    options={{
      baseUrl: '/docs',
    }}
    renderers={{
      hr: CustomHr,
    }}
    source={`
# Learn GraphQL

GraphQL is a tool you can use to work with the information you can access through the Qostodian API.

## GraphQL vs REST protocol

GraphQL is an open-source data query and manipulation language for APIs that works with the **REST protocol** you may already be familiar
with. GraphQL improves the query process. Unlike REST, which queries multiple routes, GraphQL uses **a single endpoint** to which you provide a query in a JSON-like format.

## Queries

> To test these queries as you read through this tutorial, have a look at the [Playground's documentation](/basics/primes-playground).

With GraphQL you can query **exactly what you need**. Nothing more, nothing less. You just need to specify what that exact info is that you need. 

### Example

In the following query, you tell the API that you want to query the \`people\`, and in the resulting list, you want the fields \`id\`, \`email\` and \`fullName\`. 

The queries can also have names, to make them easier to find inside your application. Here, the query is named \`GetPeople\`.

\`\`\`graphql
query GetPeople {
  people {
    results {
      id
      email
      fullName
    }
  }
}
\`\`\`

Prime's API returns a JSON for each request you make. Here, you get a response for \`id\`, \`email\` and \`fullName\` that would look something like this.

\`\`\`json
{
  "data": {
    "people": {
      "results": [
        {
          "id": "002fa636-d09b-4d24-9b69-43eba140ddb9",
          "email": "john.doe@acme.com",
          "fullName": "John Doe"
        }
      ]
    }
  }
}
\`\`\`

## Mutations

Mutations are similar to queries. The difference is that their purpose is to **modify data**, rather than
fetch it. Queries can be distinguished from mutations with the \`mutation\` prefix. For instance, to create a new
person
with the email \`jane.doe@acme.com\` and the full name \`Jane Doe\`, you could run the following query. Mutations also have
return values, to which you select the fields you want (\`id\`, \`email\` and \`fullName\`).

\`\`\`graphql
mutation {
  people {
    create(person: { email: "jane.doe@adme.com", fullName: "Jane Doe" }) {
      id
      email
      fullName
    }
  }
}
\`\`\`

## Arguments

In GraphQL, every **field** can also receive **arguments**. In the Qostodian Prime API, you can use arguments to provide \`Paging\`
, \`Sorting\`, \`Filters\`, etc. 

### Example  

Entering the following query returns the first 20 people who are sorted by \`fullName\` in ascending (alphabetical order).

\`\`\`graphql
query GetPeopleSorted {
  people {
    results(
      paging: { first: 20, skip: 0 }
      sorting: [{ field: "person.fullName", order: ASC }]
    ) {
      id
      email
      fullName
    }
  }
}
\`\`\`

## Variables

You can provide arguments inline like you did above, or through **query variables**. This becomes useful when you query the API from an application. 

### Example  

The query above could be transformed into the following.

> When using the playground, the **VARIABLES** panel found at the bottom left of the screen allows you to provide query variables.

**Query**

\`\`\`graphql
query GetPeopleSortedWithVariables($paging: Paging!, $sorting: [Sorting!]!) {
  people {
    results(paging: $paging, sorting: $sorting) {
      id
      email
      fullName
    }
  }
}
\`\`\`

**Variables**

\`\`\`json
{
  "paging": {
    "first": 20,
    "skip": 0
  },
  "sorting": [
    {
      "field": "person.fullName",
      "order": "ASC"
    }
  ]
}
\`\`\`

## Learn more

These examples can help get you started using the Qostodian Prime API. To learn a lot more about GraphQL, have a look at the [graphql.org](https://graphql.org/learn/) tutorials.

If you build an application that interacts with Prime, you will most likely want to use one of the many implementations of [GraphQL clients](https://graphql.org/graphql-js/graphql-clients/) available on the web,
which will simplify the interaction with the API. 

You can also achieve this using any [REST client](https://graphql.org/graphql-js/graphql-clients/) if you prefer.

You can also find a list of nearly all resources available for GraphQL [here](https://github.com/chentsulin/awesome-graphql).

`}
  />
</body>
