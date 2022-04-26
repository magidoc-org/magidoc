<script lang="ts">
  import type { PageContent } from '$lib/pages'
  import { capitalize } from '$lib/utils/strings'
  import { Tag } from 'carbon-components-svelte'
  import type { TagProps } from 'carbon-components-svelte/types/Tag/Tag.svelte'
  import { DeprecationNotice } from '@magidoc/plugin-svelte-carbon-commons'

  export let pageContent: PageContent

  const tagStyles: TagProps['type'][] = ['outline']
</script>

<DeprecationNotice
  deprecationReason={pageContent.attributes.deprecationReason}
/>

<h1>
  {pageContent.attributes.title}
</h1>
<div class="tags">
  {#each pageContent.attributes.tags as tag, index}
    <Tag type={tagStyles[index % tagStyles.length]}>
      {capitalize(tag)}
    </Tag>
  {/each}

  {#if pageContent.attributes.since}
    <Tag type={'outline'}>
      Since: {pageContent.attributes.since}
    </Tag>
  {/if}
</div>

<style>
  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.2rem;
  }
</style>
