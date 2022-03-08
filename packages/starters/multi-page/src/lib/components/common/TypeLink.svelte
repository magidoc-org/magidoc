<script lang="ts">
  import { Link } from 'carbon-components-svelte'

  import {
    GraphQLType,
    isListType,
    isNonNullType,
  } from 'graphql'

  export let type: GraphQLType
  
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else}
  <Link href={`/model/types/${type.name}`}>{type.name}</Link>
{/if}
