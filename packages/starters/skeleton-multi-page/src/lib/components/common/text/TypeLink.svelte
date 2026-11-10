<script lang="ts">
import { urlUtils } from '@magidoc/plugin-svelte-marked'
import { type GraphQLType, isListType, isNamedType, isNonNullType } from 'graphql'
import { getSiteRoot } from '#lib/variables'

export let type: GraphQLType
</script>

{#if isListType(type)}
  [<svelte:self type={type.ofType} />]
{:else if isNonNullType(type)}
  <svelte:self type={type.ofType} />!
{:else if isNamedType(type)}
  <a class="text-primary-700-300 underline-offset-4 hover:underline" href={urlUtils.joinUrlPaths(getSiteRoot(), 'types', String(type.name))}>{type.name}</a>
{/if}
