<script lang="ts" context="module">
  import { findPageByHref } from '$lib/pages'

  import type { LoadEvent, LoadOutput } from '@sveltejs/kit'

  export function load({ url }: LoadEvent): LoadOutput {
    const page = findPageByHref(url.pathname)
    if (!page) {
      return {
        status: 404,
        error: 'Could not find the page you are looking for',
      }
    }

    return {
      status: 200,
      props: {
        page,
      },
    }
  }
</script>

<script lang="ts">
  import CarbonMarkdown from '$lib/components/markdown/CarbonMarkdown.svelte'
  import type { WebsitePage } from 'src/app'
  import PreviousNextPage from '$lib/components/nav/PreviousNextPage.svelte'

  export let page: WebsitePage
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<CarbonMarkdown source={page.content} />

<PreviousNextPage {page} />
