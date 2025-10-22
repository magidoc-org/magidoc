<script lang="ts">
import type { GraphQLType } from 'graphql'
import TypeLink from '$lib/components/common/text/TypeLink.svelte'

export let types: ReadonlyArray<GraphQLType>
</script>

{#each types as item, index}
  <TypeLink type={item} />{#if index !== types.length - 1}{', '}{/if}
{/each}
