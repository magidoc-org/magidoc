<script lang="ts">
  import { base } from '$app/paths'
  import { Link } from 'carbon-components-svelte'
  import { urlUtils } from '@magidoc/plugin-svelte-marked'
  import {
    type GraphQLType,
    isListType,
    isNamedType,
    isNonNullType,
  } from 'graphql'

  export let type: GraphQLType
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else if isNamedType(type)}
  <Link href={urlUtils.joinUrlPaths(base, `/types/${String(type.name)}`)}
    >{type.name}</Link
  >
{/if}
