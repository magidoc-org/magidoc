<script lang="ts">
import { Tag } from 'carbon-components-svelte'
import type { TagsToken } from './Tags'

export let token: TagsToken
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
