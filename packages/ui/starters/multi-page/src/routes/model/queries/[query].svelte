<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'
  import { QueryType } from '@magidoc/core'

  let field: GraphQLField<unknown, unknown, unknown>

  $: {
    const target = $schema.getQueryType()?.getFields()[$page.params.query]
    if (!target) {
      throw new Error('what?')
    }
    field = target
  }
</script>

<FieldDetails {field} type={QueryType.QUERY} />
