<script lang="ts">
import TypeLink from '$lib/components/common/text/TypeLink.svelte'

import type { GraphQLType } from 'graphql'

export let types: ReadonlyArray<GraphQLType>
</script>

{#each types as item, index}
  <TypeLink type={item} />{#if index !== types.length - 1}{', '}{/if}
{/each}
