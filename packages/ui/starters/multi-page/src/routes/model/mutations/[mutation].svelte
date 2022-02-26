<script lang="ts">
  import { QueryType } from '@magidoc/core'
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLField } from 'graphql'
  import FieldDetails from '$lib/components/query/FieldDetails.svelte'

  let field: GraphQLField<unknown, unknown, unknown>

  $: {
    const target = $schema.getMutationType()?.getFields()[$page.params.mutation]
    if (!target) {
      throw new Error('what?')
    }
    field = target
  }
</script>

<FieldDetails {field} type={QueryType.MUTATION} />
