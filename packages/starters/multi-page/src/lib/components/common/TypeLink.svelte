<script lang="ts">
  import { Link } from 'carbon-components-svelte'

  import { type GraphQLType, isListType, isNamedType, isNonNullType } from 'graphql'

  export let type: GraphQLType
  /* eslint-disable @typescript-eslint/restrict-template-expressions */
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else if isNamedType(type)}
  <Link href={`/model/types/${type.name}`}>{type.name}</Link>
{/if}
