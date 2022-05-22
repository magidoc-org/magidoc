<script lang="ts">
  import { base } from '$app/paths'
  import { Link } from 'carbon-components-svelte'
  import { joinUrlPaths } from '@magidoc/plugin-svelte-carbon-commons'
  import {
    type GraphQLType,
    isListType,
    isNamedType,
    isNonNullType,
  } from 'graphql'

  export let type: GraphQLType
  /* eslint-disable @typescript-eslint/restrict-template-expressions */
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else if isNamedType(type)}
  <Link href={joinUrlPaths(base, `/model/types/${type.name}`)}>{type.name}</Link
  >
{/if}
