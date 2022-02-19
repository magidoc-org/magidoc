<script lang="ts">
  import type { GraphQLField } from 'graphql'
  import QueryGenerator from '../../query-generator/src/lib/components/QueryGenerator.svelte'
  import { schema } from './lib/Schema'

  let field: GraphQLField<unknown, unknown>

  let depth = 4
  let index = 0

  $: {
    const queryType = $schema.getQueryType()

    if (queryType) {
      const fields = queryType.getFields()
      field = fields[Object.keys(fields)[index]]
    }
  }
</script>

<main>
  <div>
    Depth:
    <input type="number" bind:value={depth} />
  </div>
  <div>
    Field:
    <input
      type="number"
      bind:value={index}
      min={0}
      max={Math.max(
        Object.values($schema.getQueryType()?.getFields() || {}).length - 1,
        0,
      )}
    />
  </div>
  <QueryGenerator
    {field}
    queryPanelHeight={350}
    generatorConfig={{
      maxDepth: depth,
    }}
  />
</main>
