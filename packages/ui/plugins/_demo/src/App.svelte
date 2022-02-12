<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import QueryGenerator from '../../query-generator/src/Component.svelte'
  import { schema } from './lib/Schema'
  import { NullGenerationStrategy } from '@core/generator/config'

  const queryType = $schema.getQueryType()

  let field: GraphQLField<unknown, unknown>

  if (queryType) {
    const fields = queryType.getFields()
    field = fields[Object.keys(fields)[0]]
  }
</script>

<main>
  <QueryGenerator
    {field}
    queryPanelHeight={350}
    generatorConfig={{
      maxDepth: 5,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }}
  />
</main>
