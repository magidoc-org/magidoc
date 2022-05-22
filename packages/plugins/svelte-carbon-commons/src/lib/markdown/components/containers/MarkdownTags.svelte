<script lang="ts">
  import type { TagsToken } from '$lib/markdown/extensions/components/Tags'
  import type {
    MarkdownOptions,
    Renderers,
  } from '$lib/markdown/markedConfiguration'
  import { Tag } from 'carbon-components-svelte'

  export let token: TagsToken
  export const options: MarkdownOptions = undefined
  export const renderers: Renderers = undefined
</script>

<div class="tags">
  {#each token.tags as tag, index}
    <Tag type={token.colors[index % token.colors.length]}>
      {tag.name}
    </Tag>
  {/each}
</div>

<style>
  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.2rem;
  }
</style>
