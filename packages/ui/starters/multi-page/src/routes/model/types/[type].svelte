<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import type { GraphQLNamedType } from 'graphql'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'

  let type: GraphQLNamedType | undefined
  $: type = $schema.getType($page.params.type)
</script>

{#if type}
  <div>
    {type.name}
  </div>
{:else}
  <EntityNotFound type="type" name={$page.params.type} />
{/if}
