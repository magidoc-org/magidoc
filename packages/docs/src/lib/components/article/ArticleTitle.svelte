<script lang="ts">
  import type { PageContent } from '$lib/pages'
  import { capitalize } from '$lib/utils/strings'
  import { Tag } from 'carbon-components-svelte'
  import type { TagProps } from 'carbon-components-svelte/types/Tag/Tag.svelte'

  export let pageContent: PageContent

  const tagStyles: TagProps['type'][] = [
    'blue',
    'purple',
    'cyan',
    'teal',
    'green',
  ]
</script>

<h1>{pageContent.attributes.title}</h1>
{#each pageContent.attributes.tags as tag, index}
  <Tag type={tagStyles[index % tagStyles.length]}>
    {capitalize(tag)}
  </Tag>
{/each}

{#if pageContent.attributes.since}
  <Tag type={'cool-gray'}>
    Since: {pageContent.attributes.since}
  </Tag>
{/if}
