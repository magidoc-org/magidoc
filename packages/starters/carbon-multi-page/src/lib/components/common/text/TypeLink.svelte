<script lang="ts">
import { getSiteRoot } from '$lib/variables'
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import { Link } from 'carbon-components-svelte'
import { type GraphQLType, isListType, isNamedType, isNonNullType } from 'graphql'

export let type: GraphQLType
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else if isNamedType(type)}
  <Link href={urlUtils.joinUrlPaths(getSiteRoot(), 'types', String(type.name))}
    >{type.name}</Link
  >
{/if}
