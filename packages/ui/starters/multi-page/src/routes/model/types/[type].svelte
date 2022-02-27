<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import { GraphQLNamedType, isEnumType, isScalarType } from 'graphql'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'
  import ScalarType from '$lib/components/type/ScalarType.svelte'

  let type: GraphQLNamedType | undefined
  $: type = $schema.getType($page.params.type)
</script>

{#if type}
  {#if isScalarType(type)}
    <ScalarType {type} />
  {:else if isEnumType(type)}

    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}
{:else}
  <EntityNotFound type="type" name={$page.params.type} />
{/if}
