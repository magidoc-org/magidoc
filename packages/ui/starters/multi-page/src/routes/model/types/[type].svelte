<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLNamedType } from 'graphql'

  let type: GraphQLNamedType
  $: {
    const target = $schema.getType($page.params.type)
    if (!target) {
      throw new Error('what?')
    }
    type = target
  }
</script>

<div>
  {type.name}
</div>
