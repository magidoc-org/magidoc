<script lang="ts">
  import { schema } from '$lib/schema'
  import { page } from '$app/stores'
  import { GraphQLNamedType, isEnumType, isScalarType } from 'graphql'
  import EntityNotFound from '$lib/components/EntityNotFound.svelte'
  import ScalarType from '$lib/components/type/ScalarType.svelte'
  import EnumType from '$lib/components/type/EnumType.svelte'

  let type: GraphQLNamedType | undefined
  $: type = $schema.getType($page.params.type)
</script>

{#if type}
  {#if isScalarType(type)}
    <ScalarType {type} />
  {:else if isEnumType(type)}
    <EnumType {type} />
  {:else}
    <!-- else content here -->
  {/if}
{:else}
  <EntityNotFound type="type" name={$page.params.type} />
{/if}
