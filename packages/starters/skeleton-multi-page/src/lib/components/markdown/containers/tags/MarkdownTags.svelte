<script lang="ts">
import AppTag from '#lib/components/common/AppTag.svelte'
import type { TagsToken } from './Tags'

export let token: TagsToken
</script>

<div class="my-2 flex flex-wrap gap-1">
  {#each token.tags as tag, index}
    <AppTag color={token.colors[index % token.colors.length]}>{tag.name}</AppTag>
  {/each}
</div>
