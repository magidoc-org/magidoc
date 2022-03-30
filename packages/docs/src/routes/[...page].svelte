<script lang="ts" context="module">
  export async function load({
    url,
    fetch,
    stuff,
  }: LoadInput): Promise<LoadOutput> {
    const href = url.pathname
    const currentPage = getCurrentPage(href, stuff.pages as Pages)
    if (!currentPage) {
      return {
        status: 404,
      }
    }

    const response = await fetch(currentPage.value.fetchRef)
    return {
      status: response.status,
      props: {
        pageSource: await response.text(),
      },
    }
  }
</script>

<script lang="ts">
  import MarkdownSection from '$lib/components/common/MarkdownSection.svelte'

  import { getCurrentPage, type CurrentPage, type Pages } from '$lib/pages'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import type { LoadInput } from '@sveltejs/kit/types/internal'

  export let pageSource: string
  export let currentPage: CurrentPage
</script>

<svelte:head>
  <title>
    {currentPage?.value?.name || 'Magidoc'}
  </title>
</svelte:head>

<MarkdownSection source={pageSource} />
