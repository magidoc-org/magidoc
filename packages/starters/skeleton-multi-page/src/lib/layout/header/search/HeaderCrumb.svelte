<script lang="ts">
import type { MarkdownHeader } from '@magidoc/plugin-fuse-markdown'

export let section: string | undefined
export let headers: ReadonlyArray<MarkdownHeader>
</script>

{#if section}
  <strong>{section}</strong>
  {#if headers.length > 0}
    {' > '}
  {/if}
{/if}
{#each headers as item, index}
  <strong>{item.text}</strong>
  {#if index < headers.length - 1}
    {' > '}
  {/if}
{/each}
