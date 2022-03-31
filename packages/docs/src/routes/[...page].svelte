<script lang="ts" context="module">
  export async function load({ url, stuff }: LoadInput): Promise<LoadOutput> {
    const href = url.pathname
    const currentPage = getCurrentPage(href, stuff.pages as Pages)
    if (!currentPage) {
      return {
        status: 404,
      }
    }

    const pageSource = await currentPage.value.contentFetcher()
    return {
      status: 200,
      props: {
        currentPage: currentPage,
        pageSource: pageSource,
      },
    }
  }
</script>

<script lang="ts">
  import MarkdownSection from '$lib/components/common/markdown/MarkdownSection.svelte'

  import { getCurrentPage, type CurrentPage, type Pages } from '$lib/pages'
  import type { LoadOutput } from '@sveltejs/kit/types/internal'
  import type { LoadInput } from '@sveltejs/kit/types/internal'

  export let currentPage: CurrentPage
  export let pageSource: string
</script>

<svelte:head>
  <title>
    {currentPage.value.name}
  </title>
</svelte:head>

<MarkdownSection source={pageSource} />
